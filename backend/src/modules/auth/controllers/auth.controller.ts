import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../models/dtos/login.dto';
import { AuthServiceContract } from '../services/contracts/auth.service.contract';
import { AuthDto } from '../models/dtos/auth.dto';
import { User } from '../../user/models/domains/user.domain';
import { AuthUser } from '../decorators/auth-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@ApiBearerAuth('JWT')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServiceContract) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (!(await this.authService.verifyEmail(loginDto.email))) {
      throw new BadRequestException('Пользователь не найден');
    }

    await this.authService.sendCode(loginDto.email);
  }

  @ApiResponse({ type: AuthDto })
  @Post('auth/:code')
  async auth(@Param('code') code: string): Promise<AuthDto> {
    const token = await this.authService.login(code);
    return new AuthDto(token);
  }

  @UseGuards(AuthGuard)
  @Get('testAuth')
  async testAuth(@AuthUser() user: User) {
    return user.id;
  }
}
