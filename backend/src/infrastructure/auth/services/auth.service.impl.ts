import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthServiceContract } from './contracts/auth.service.contract';
import { UserService } from '../../../modules/user/services/contracts/user.service.contract';
import { AuthCodeStore } from './contracts/auth-code-store.service.contract';
import { AuthJwtService } from './contracts/auth-jwt.service.contract';
import { MailCreatorService } from '../../mail/services/contracts/mail-creator.service.contract';

@Injectable()
export class AuthServiceImpl extends AuthServiceContract {
  constructor(
    private userService: UserService,
    private authCodeStore: AuthCodeStore,
    private authJwtService: AuthJwtService,
    private mailCreator: MailCreatorService,
  ) {
    super();
  }

  verifyEmail(email: string): Promise<boolean> {
    return this.userService.isExistUserByEmail(email);
  }

  async sendCode(email: string): Promise<void> {
    const authCode = this.authCodeStore.generateCode(email);
    await this.mailCreator.sendAuthCode(authCode.email, authCode.code);
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
