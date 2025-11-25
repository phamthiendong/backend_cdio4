import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SepayWebhookDto {
  @IsString()
  @IsOptional()
  transaction_id: string;

  @IsString()
  @IsOptional()
  order_code?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  account_number?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  transfer_time?: string;
}
