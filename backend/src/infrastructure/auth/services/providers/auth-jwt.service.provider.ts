import { Provider } from '@nestjs/common';
import { AuthJwtService } from '../contracts/auth-jwt.service.contract';
import { AuthJwtServiceImpl } from '../auth-jwt.service.impl';

export const AuthJwtServiceProvider = {
  provide: AuthJwtService,
  useClass: AuthJwtServiceImpl,
} satisfies Provider;
