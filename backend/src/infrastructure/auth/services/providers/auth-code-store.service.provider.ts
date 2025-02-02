import { Provider } from '@nestjs/common';
import { AuthCodeStore } from '../contracts/auth-code-store.service.contract';
import { AuthCodeStoreImpl } from '../auth-code-store.service.impl';

export const AuthCodeStoreProvider = {
  provide: AuthCodeStore,
  useClass: AuthCodeStoreImpl,
} satisfies Provider;
