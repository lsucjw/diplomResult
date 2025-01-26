import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthServiceContract } from './contracts/auth.service.contract';
import { UserService } from '../../user/services/contracts/user.service.contract';
import { AuthCodeStore } from './contracts/auth-code-store.service.contract';
import { AuthJwtService } from './contracts/auth-jwt.service.contract';

@Injectable()
export class AuthServiceImpl extends AuthServiceContract {
  constructor(
    private userService: UserService,
    private authCodeStore: AuthCodeStore,
    private authJwtService: AuthJwtService,
  ) {
    super();
  }

  verifyEmail(email: string): Promise<boolean> {
    return this.userService.isExistUserByEmail(email);
  }

  async sendCode(email: string): Promise<void> {
    const authCode = this.authCodeStore.generateCode(email);
    // Логика отправки
    console.log(authCode.code);
  }

  async login(code: string): Promise<string> {
    const codeIsVerified = this.authCodeStore.verifyCode(code);
    if (!codeIsVerified) {
      throw new BadRequestException('Invalid code');
    }

    const authCode = this.authCodeStore.getCode(code);
    return this.authJwtService.generateToken(authCode.email);
  }
}
