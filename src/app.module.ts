import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';

import { ConfigModule } from './configs/config.module';
import { ConfigService } from './configs/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomLogger } from './common/modules/logger/customerLogger.service';
import { LoggerMiddleware } from './common/middlewares/middleware';
import { MailModule } from './common/modules/mail/mail.module';
import { SepayModule } from './modules/sepay/sepay.module';
import { Payment } from './modules/sepay/entities/payment.entity';
import { GeminiModule } from './modules/gemini/gemini.module';
import { ApprovedContent } from './modules/gemini/entities/approved_content.entity';
import { PendingContent } from './modules/gemini/entities/pending-content.entity';
import { RejectedContent } from './modules/gemini/entities/rejected-content.entity';

console.log({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_DATABASE || 'test',
  entities: [User],
  logging: true,
  synchronize: true
});
@Module({
  imports: [
    ConfigModule,

    // Schedule Modules
    ScheduleModule.forRoot(),

    // Database Connection Config
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_DATABASE || 'test',
      entities: [User, Payment, ApprovedContent, PendingContent, RejectedContent],
      logging: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([]),

    MailModule,
    SepayModule,
    UserModule,
    AuthModule,
    GeminiModule
  ],
  controllers: [AppController],
  providers: [ConfigService, CustomLogger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
