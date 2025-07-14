import { Body, Controller, Post } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { GetEncryptDto } from './dtos/get-encrypt-data.dto';
import { GetDecryptDto } from './dtos/get-decrypt-data.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Encrypt')
@Controller()
export class EncryptController {
  constructor(private readonly service: EncryptService) {}

  @Post('/get-encrypt-data')
  getEncrypt(@Body() dto: GetEncryptDto) {
    return this.service.getEncryptData(dto.payload);
  }

  @Post('/get-decrypt-data')
  getDecrypt(@Body() dto: GetDecryptDto) {
    return this.service.getDecryptData(dto.data1, dto.data2);
  }
}
