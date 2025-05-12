import { Provider } from '@nestjs/common';
import { ScheduleUploadService } from '../contracts/schedule-upload.service.contract';
import { ScheduleUploadServiceImpl } from '../schedule-upload.service.impl';

export const ScheduleUploadServiceProvider = {
  provide: ScheduleUploadService,
  useClass: ScheduleUploadServiceImpl,
} satisfies Provider;
