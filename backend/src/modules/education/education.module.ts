import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectTypeEntity } from './models/entities/subject-type.entity';
import { SubjectEntity } from './models/entities/subject.entity';
import { EventKindEntity } from './models/entities/event-kind.entity';
import { RoomEntity } from './models/entities/room.entity';
import { ConsultationEntity } from './models/entities/consultation.entity';
import { EventEntity } from './models/entities/event.entity';
import { FavoriteConsultationEntity } from './models/entities/favorite-consultation.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleUploadServiceProvider } from './services/providers/schedule-upload.service.provider';
import { ScheduleUpdateServiceProvider } from './services/providers/schedule-update.service.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubjectTypeEntity,
      SubjectEntity,
      RoomEntity,
      ConsultationEntity,
      EventEntity,
      EventKindEntity,
      FavoriteConsultationEntity,
    ]),
    MulterModule.register({
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleUploadServiceProvider, ScheduleUpdateServiceProvider],
})
export class EducationModule {}
