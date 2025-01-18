import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/dtos/user.dto';
import { UserService } from '../services/contracts/user.service.contract';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: [UserDto] })
  @Get('getAll')
  getAll() {
    return this.userService.getAll();
  }

  @Post('create')
  createUser(@Body() user: UserDto): UserDto {
    return this.userService.create(user);
  }

  @Delete('delete')
  delete(@Param('userId') userId: number) {
    this.userService.delete(userId);
  }
}
