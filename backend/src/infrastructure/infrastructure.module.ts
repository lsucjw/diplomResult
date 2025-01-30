import { Global, Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Global()
@Module({
  imports: [MailModule, AuthModule, DbModule],
})
export class InfrastructureModule {}
