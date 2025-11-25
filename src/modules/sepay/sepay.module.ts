import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Payment } from './entities/payment.entity';
import { SepayController } from './sepay.controller';
import { SepayService } from './sepay.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    HttpModule.register({
      timeout: 100000,
      maxRedirects: 5
    }),
    ConfigModule
  ],
  controllers: [SepayController],
  providers: [SepayService],
  exports: [SepayService]
})
export class SepayModule {}
