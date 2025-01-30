import { Provider } from '@nestjs/common';
import { MailSenderService } from '../contracts/mail-sender.service.contract';
import { MailSenderServiceImpl } from '../mail-sender.service.impl';

export const MailSenderServiceProvider = {
  provide: MailSenderService,
  useClass: MailSenderServiceImpl,
} satisfies Provider;
