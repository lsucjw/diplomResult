import { MailCreatorService } from './contracts/mail-creator.service.contract';
import { Injectable } from '@nestjs/common';
import { MailSenderService } from './contracts/mail-sender.service.contract';
import { Mail } from '../models/domains/mail.domain';

@Injectable()
export class MailCreatorServiceImpl extends MailCreatorService {
  constructor(private sender: MailSenderService) {
    super();
  }
  async sendAuthCode(email: string, code: string): Promise<void> {
    await this.sender.send(
      new Mail({
        to: email,
        subject: 'Код доступа к приложению StudyPlan',
        text: `Код доступа <strong>${code}</strong>`,
      }),
    );
  }
}
