import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDecryptDto {
  @ApiProperty()
  @IsString()
  data1: string;

  @ApiProperty()
  @IsString()
  data2: string;
}
