import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { EncryptController } from './encrypt.controller';

@Module({
  providers: [EncryptService],
  controllers: [EncryptController]
})
export class EncryptModule {}
