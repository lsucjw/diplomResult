export abstract class AuthServiceContract {
  abstract verifyEmail(email: string): Promise<boolean>;
  abstract sendCode(email: string): Promise<void>;
  abstract login(code: string): Promise<string>;
}
