export abstract class MailCreatorService {
  abstract sendAuthCode(email: string, code: string): Promise<void>;
}
