import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserRequestDto {
  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surName: string;
}
