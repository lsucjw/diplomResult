import { Provider } from '@nestjs/common';
import { GroupService } from '../contracts/group.service.contract';
import { GroupServiceImpl } from '../group.service.impl';

export const GroupServiceProvider = {
  provide: GroupService,
  useClass: GroupServiceImpl,
} satisfies Provider;
