import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEncryptDto {
  @ApiProperty()
  @IsString()
  @Length(1, 2000)
  payload: string;
}
