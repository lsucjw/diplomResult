import { CreateMailInterface } from '../interfaces/create-mail.interface';

export class Mail implements CreateMailInterface {
  constructor(value: CreateMailInterface) {
    this.from = this.defaultFrom;
    this.to = value.to;
    this.subject = value.subject;
    this.text = value.text;
  }

  get defaultFrom(): string {
    return 'StudyPlanSurgu@asty.online';
  }

  from: string;
  to: string;
  subject: string;
  text: string;
}
