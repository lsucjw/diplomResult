import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Role } from '../role.enum';
import { GroupDto } from './group.dto';
import { ProfileDto } from './profile.dto';
import { Type } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  @ValidateNested()
  @Type(() => GroupDto)
  group: GroupDto;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
