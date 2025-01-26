import { AuthCode } from '../models/domains/auth-code.domain';
import { AuthCodeStore } from './contracts/auth-code-store.service.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthCodeStoreImpl extends AuthCodeStore {
  private codeStore = new Map<string, AuthCode>();

  generateCode(email: string): AuthCode {
    const authCode = new AuthCode(email, this.getCodeCandidate());

    this.codeStore.set(email, authCode);
    return authCode;
  }

  verifyCode(code: string) {
    const authCode = this.getCode(code);

    if (!authCode || authCode.isExpire()) {
      return false;
    }

    return true;
  }

  getCode(code: string): AuthCode {
    return [...this.codeStore.values()].find((x) => x.equal(code));
  }

  private getCodeCandidate(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
