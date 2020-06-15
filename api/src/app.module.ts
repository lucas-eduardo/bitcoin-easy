import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './session/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3333,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      cache: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register(),
    AuthModule,
    UserModule,
    TransactionModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
