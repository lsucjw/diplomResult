import { Provider } from '@nestjs/common';
import { UserService } from '../contracts/user.service.contract';
import { UserServiceImpl } from '../user.service.impl';

export const UserServiceProvider = {
  provide: UserService,
  useClass: UserServiceImpl,
} satisfies Provider;
