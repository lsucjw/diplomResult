import { Provider } from '@nestjs/common';
import { MailCreatorService } from '../contracts/mail-creator.service.contract';
import { MailCreatorServiceImpl } from '../mail-creator.service.impl';

export const MailCreatorServiceProvider = {
  provide: MailCreatorService,
  useClass: MailCreatorServiceImpl,
} satisfies Provider;
