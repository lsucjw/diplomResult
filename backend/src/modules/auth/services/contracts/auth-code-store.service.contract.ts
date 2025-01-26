import { AuthCode } from '../../models/domains/auth-code.domain';

export abstract class AuthCodeStore {
  abstract generateCode(email: string): AuthCode;
  abstract getCode(code: string): AuthCode;
  abstract verifyCode(email: string): boolean;
}
