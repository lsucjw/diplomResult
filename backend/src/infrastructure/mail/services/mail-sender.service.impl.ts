import { Mail } from '../models/domains/mail.domain';
import { MailSenderService } from './contracts/mail-sender.service.contract';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailSenderServiceImpl
  extends MailSenderService
  implements OnModuleInit
{
  private transporter: Transporter;

  async onModuleInit() {
    this.transporter = createTransport({
      host: 'connect.smtp.bz', // TODO перенести в конфиги
      port: 587,
      secure: false,
      auth: {
        user: 'aurstudioru@gmail.com',
        pass: 'qF0B8cx9xSuu',
      },
    });
  }

  async send(mail: Mail): Promise<void> {
    await this.transporter.sendMail({
      ...mail,
    });
  }
}
