import { Module } from '@nestjs/common';
import { MailSenderServiceProvider } from './services/providers/mail-sender.service.provider';
import { MailCreatorServiceProvider } from './services/providers/mail-creator.service.provider';

@Module({
  providers: [MailSenderServiceProvider, MailCreatorServiceProvider],
  exports: [MailCreatorServiceProvider],
})
export class MailModule {}
