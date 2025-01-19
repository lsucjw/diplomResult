import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
