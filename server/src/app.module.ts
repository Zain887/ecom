import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
})
export class AppModule { }
