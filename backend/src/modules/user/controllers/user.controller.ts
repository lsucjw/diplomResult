import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/dtos/user.dto';
import { UserService } from '../services/contracts/user.service.contract';
import { CreateUserRequestDto } from '../models/dtos/create-user-request.dto';
import { CreateUserResponseDto } from '../models/dtos/create-user-response.dto';
import { InjectMapper, MapperInterface } from '@mappers/nest';
import { User } from '../models/domains/user.domain';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(
    @InjectMapper() private readonly mapper: MapperInterface,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({ type: [UserDto] })
  @Get('getAll')
  async getAll(): Promise<UserDto[]> {
    return this.mapper.autoMap(await this.userService.getAll(), UserDto);
  }

  @ApiResponse({ type: CreateUserResponseDto })
  @Post('create')
  async createUser(
    @Body() createUserRequest: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.create(
      await this.mapper.autoMap(createUserRequest, User),
    );

    return this.mapper.autoMap(user, CreateUserResponseDto);
  }

  @ApiResponse({ type: [UserDto] })
  @Delete('delete')
  async delete(@Param('userId') userId: number) {
    return this.mapper.autoMap(await this.userService.delete(userId), UserDto);
  }
}
