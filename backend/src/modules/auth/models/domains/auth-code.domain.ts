export class AuthCode {
  constructor(email: string, code: string) {
    this.createTime = new Date();
    this.email = email;
    this.code = code;
  }

  createTime: Date;
  email: string;
  code: string;

  isExpire(): boolean {
    const diffInMilliseconds = Date.now() - this.createTime.getTime();
    const tenMinutesInMilliseconds = 10 * 60 * 1000;

    return diffInMilliseconds >= tenMinutesInMilliseconds;
  }

  equal(code: string) {
    return this.code === code;
  }
}
