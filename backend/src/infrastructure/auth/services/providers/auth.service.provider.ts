import { Provider } from '@nestjs/common';
import { AuthServiceImpl } from '../auth.service.impl';
import { AuthServiceContract } from '../contracts/auth.service.contract';

export const AuthServiceProvider = {
  provide: AuthServiceContract,
  useClass: AuthServiceImpl,
} satisfies Provider;
