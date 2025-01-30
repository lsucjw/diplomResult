import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  constructor(token: string) {
    this.token = token;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
