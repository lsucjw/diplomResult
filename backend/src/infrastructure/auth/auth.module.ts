import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceProvider } from './services/providers/auth.service.provider';
import { AuthController } from './controllers/auth.controller';
import { AuthCodeStoreProvider } from './services/providers/auth-code-store.service.provider';
import { AuthJwtServiceProvider } from './services/providers/auth-jwt.service.provider';
import { MailModule } from '../../infrastructure/mail/mail.module';
import { UserModule } from '../../modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '123123',
      signOptions: {
        expiresIn: '300m',
      },
    }),
    forwardRef(() => UserModule),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthServiceProvider,
    AuthCodeStoreProvider,
    AuthJwtServiceProvider,
  ],
})
export class AuthModule {}
