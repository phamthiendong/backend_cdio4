import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Payment } from 'src/modules/sepay/entities/payment.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST') || 'localhost',
        port: configService.get('DATABASE_PORT') || 3306,
        username: configService.get('DATABASE_USER') || 'root',
        password: configService.get('DATABASE_PASSWORD') || 'root',
        database: process.env.DATABASE_DATABASE || 'test',
        entities: [User, Payment, Comment],
        logging: true,
        timezone: 'Z',
        synchronize: true
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        addTransactionalDataSource(dataSource);
        return dataSource;
      }
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
