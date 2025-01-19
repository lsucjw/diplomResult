import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '../role.enum';
import { GroupDto } from './group.dto';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsNotEmpty()
  group: GroupDto;
}
