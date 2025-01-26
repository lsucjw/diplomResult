import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailSenderService } from '../services/contracts/mail-sender.service.contract';
import { Mail } from '../models/domains/mail.domain';

@ApiTags('mail')
@Controller('mail')
export class MailSenderController {
  constructor(private sender: MailSenderService) {}
  @Get()
  async send() {
    await this.sender.send(new Mail());
  }
}
