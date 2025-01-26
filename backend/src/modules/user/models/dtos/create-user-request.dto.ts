import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Role } from '../role.enum';
import { ProfileDto } from './profile.dto';
import { Type } from 'class-transformer';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
