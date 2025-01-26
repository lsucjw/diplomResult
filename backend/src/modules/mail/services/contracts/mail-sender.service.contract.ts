import { Mail } from '../../models/domains/mail.domain';

export abstract class MailSenderService {
  abstract send(mail: Mail): Promise<void>;
}
