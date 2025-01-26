import { Module } from '@nestjs/common';
import { MailSenderServiceProvider } from './services/providers/mail-sender.service.provider';
import { MailSenderController } from './controllers/mail-sender.controller';

@Module({
  controllers: [MailSenderController],
  providers: [MailSenderServiceProvider],
})
export class MailModule {}
