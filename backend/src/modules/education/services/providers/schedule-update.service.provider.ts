import { Provider } from '@nestjs/common';
import { ScheduleUpdateServiceImpl } from '../schedule-update.service.impl';
import { ScheduleUpdateService } from '../contracts/schedule-update.service.contract';

export const ScheduleUpdateServiceProvider = {
  provide: ScheduleUpdateService,
  useClass: ScheduleUpdateServiceImpl,
} satisfies Provider;
