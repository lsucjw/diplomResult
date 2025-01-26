import { UserService } from '../../user/services/contracts/user.service.contract';
import { AuthJwtService } from './contracts/auth-jwt.service.contract';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/models/domains/user.domain';
import { TokenPayloadInterface } from '../models/interfaces/token-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthJwtServiceImpl extends AuthJwtService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async generateToken(email: string): Promise<string> {
    const { id } = await this.userService.getUserByEmail(email);
    return this.jwtService.signAsync(
      { id, email },
      {
        expiresIn: '300m',
      },
    );
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const { email } =
        await this.jwtService.verifyAsync<TokenPayloadInterface>(token);

      return this.userService.getUserByEmail(email);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
