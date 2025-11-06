import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Payment, PaymentStatusEnum } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { SepayWebhookDto } from './dto/sepayWebhook.dto';

@Injectable()
export class SepayService {
  private readonly logger = new Logger(SepayService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  // Tạo giao dịch + QR code
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const { orderCode, amount } = createPaymentDto;

    this.logger.log(`Tạo giao dịch chờ thanh toán: ${orderCode} - ${amount}đ`);

    try {
      const existingPayment = await this.paymentRepository.findOne({ where: { orderCode } });
      const bankCode = this.configService.get('SEPAY_BANK_CODE') || 'TPBANK';
      const accountNumber = this.configService.get('SEPAY_ACCOUNT_NUMBER');
      const accountName = this.configService.get('SEPAY_ACCOUNT_NAME') || 'PHAM THIEN DONG';
      const transferContent = `TT CLINIC${orderCode}`;
      const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}`;

      if (existingPayment) {
        this.logger.warn(`OrderCode ${orderCode} đã tồn tại, trả về lại`);
        return {
          orderCode,
          amount,
          qrUrl,
          bankInfo: { bankCode, accountNumber, accountName, transferContent },
          status: existingPayment.status
        };
      }

      const payment = this.paymentRepository.create({
        orderCode,
        amount,
        status: PaymentStatusEnum.PENDING
      });
      await this.paymentRepository.save(payment);

      this.logger.log(`Đã lưu payment vào DB: ${payment.id}`);
      return {
        orderCode,
        amount,
        qrUrl,
        bankInfo: { bankCode, accountNumber, accountName, transferContent },
        status: PaymentStatusEnum.PENDING
      };
    } catch (error) {
      this.logger.error(`CreatePayment Error: ${error.message}`);
      throw new InternalServerErrorException(error.message);
    }
  }

  // Lấy trạng thái
  async getPaymentStatus(orderCode: string): Promise<{ status: PaymentStatusEnum }> {
    const payment = await this.paymentRepository.findOne({ where: { orderCode } });
    if (!payment) throw new NotFoundException(`Không tìm thấy giao dịch ${orderCode}`);
    return { status: payment.status };
  }

  // Webhook từ SePay
  async processWebhook(payload: SepayWebhookDto) {
    this.logger.log(`Nhận webhook từ SePay: ${JSON.stringify(payload)}`);

    const amount = typeof payload.amount === 'string' ? parseFloat(payload.amount) : payload.amount;

    const orderCode = this.extractOrderCode(payload.description || '');
    if (!orderCode) return;

    const payment = await this.paymentRepository.findOne({ where: { orderCode } });
    if (!payment) return;

    if (payment.status === PaymentStatusEnum.PAID) {
      this.logger.log(`Đã xử lý trước đó`);
      return;
    }

    payment.transactionId = payload.transaction_id || `TX_${Date.now()}`;
    payment.description = payload.description;
    payment.status = PaymentStatusEnum.PAID;
    await this.paymentRepository.save(payment);
    this.logger.log(`Webhook xác nhận thanh toán thành công cho ${orderCode}`);
  }

  private extractOrderCode(desc: string): string | null {
    const match = desc.match(/CLINIC(\d+)/i) || desc.match(/TT\s*CLINIC(\d+)/i);
    return match ? `CLINIC${match[1]}` : null;
  }

  async checkPaymentFromSepay(orderCode: string): Promise<{ isPaid: boolean; status: string }> {
    this.logger.log(`Checking payment from SePay API for ${orderCode}`);

    const payment = await this.paymentRepository.findOne({ where: { orderCode } });

    if (!payment) {
      this.logger.warn(`Payment not found: ${orderCode}`);
      return { isPaid: false, status: 'FAILED' };
    }

    // Nếu đã PAID trong DB, return luôn
    if (payment.status === PaymentStatusEnum.PAID) {
      this.logger.log(`Payment already PAID: ${orderCode}`);
      return { isPaid: true, status: 'PAID' };
    }

    // Nếu chưa PAID, thử poll SePay API
    const apiUrl = this.configService.get('SEPAY_BASE_URL') || 'https://my.sepay.vn/userapi';
    const apiKey = this.configService.get('SEPAY_API_KEY');
    const accountNumber = this.configService.get('SEPAY_ACCOUNT_NUMBER');

    if (!apiKey) {
      this.logger.warn(`Missing SEPAY_API_KEY`);
      return { isPaid: false, status: payment.status };
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${apiUrl}/transactions/list`, {
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          params: { account_number: accountNumber, limit: 50 }
        })
      );

      const transactions = response.data?.transactions || [];
      const matchedTx = transactions.find((tx: any) => {
        const text = (tx.transaction_content || tx.content || tx.description || '').toUpperCase();
        return text.includes(orderCode.toUpperCase());
      });

      if (matchedTx) {
        payment.status = PaymentStatusEnum.PAID;
        payment.transactionId = matchedTx.id || matchedTx.transaction_id || `TX_${Date.now()}`;
        payment.description = matchedTx.transaction_content || matchedTx.content || matchedTx.description;
        await this.paymentRepository.save(payment);

        this.logger.log(`Updated ${orderCode} to PAID via polling`);
        return { isPaid: true, status: 'PAID' };
      }

      return { isPaid: false, status: payment.status };
    } catch (error) {
      this.logger.error(`SePay check error: ${error.message}`);
      return { isPaid: false, status: payment.status };
    }
  }
}
