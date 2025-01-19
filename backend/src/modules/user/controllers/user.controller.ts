import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/dtos/user.dto';
import { UserService } from '../services/contracts/user.service.contract';
import { UserMapper } from '../models/mappers/user.mapper';
import { CreateUserRequestDto } from '../models/dtos/create-user-request.dto';
import { CreateUserResponseDto } from '../models/dtos/create-user-response.dto';
import { CreateUserRequestMapper } from '../models/mappers/create-user-request.mapper';
import { CreateUserResponseMapper } from '../models/mappers/create-user-response.mapper';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: [UserDto] })
  @Get('getAll')
  async getAll(): Promise<UserDto[]> {
    return await UserMapper.to().dtos(await this.userService.getAll());
  }

  @ApiResponse({ type: CreateUserResponseDto })
  @Post('create')
  async createUser(
    @Body() createUserRequest: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.create(
      CreateUserRequestMapper.to().domain(createUserRequest),
    );

    return CreateUserResponseMapper.to().dto(user);
  }

  @ApiResponse({ type: [UserDto] })
  @Delete('delete')
  async delete(@Param('userId') userId: number) {
    const t = await this.userService.delete(userId);

    return UserMapper.to().dto(t);
  }
}
