import { Mail } from '../models/domains/mail.domain';
import { MailSenderService } from './contracts/mail-sender.service.contract';
import { OnModuleInit } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

export class MailSenderServiceImpl
  extends MailSenderService
  implements OnModuleInit
{
  private transporter: Transporter;

  async onModuleInit() {
    this.transporter = createTransport({
      host: 'connect.smtp.bz',
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
      from: 'Maddiso@studyplansurgu',
      to: 'aurstudioru@gmail.com',
      subject: '123321',
      text: '123321123321',
    });
  }

  private initConnection() {}
}
