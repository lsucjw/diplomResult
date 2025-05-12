import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScheduleUploadService } from '../services/contracts/schedule-upload.service.contract';
import { ScheduleUpdateService } from '../services/contracts/schedule-update.service.contract';

@ApiTags('Education')
@Controller('v1/education')
export class ScheduleController {
  constructor(
    private scheduleUploadService: ScheduleUploadService,
    private scheduleUpdateService: ScheduleUpdateService,
  ) {}

  @Post('upload-schedule')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        schedule: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('schedule'))
  async uploadSchedule(@UploadedFile() file: Express.Multer.File) {
    const filePath = await this.scheduleUploadService.upload(file.buffer);
    await this.scheduleUpdateService.update(filePath);
  }
}
