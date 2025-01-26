import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, DbModule, AuthModule, MailModule],
})
export class AppModule {}
