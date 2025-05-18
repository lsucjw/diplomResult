import { forwardRef, Module } from '@nestjs/common';
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
import { UserModule } from '../user/user.module';
import { SubjectTypeProfile } from './models/profiles/subject-type.profile';
import { SubjectTypeServiceProvider } from './services/providers/subject-type.service.provider';
import { RoomProfile } from './models/profiles/room.profile';
import { RoomServiceProvider } from './services/providers/room.service.provider';

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
    forwardRef(() => UserModule),
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleUploadServiceProvider,
    ScheduleUpdateServiceProvider,
    RoomServiceProvider,
    SubjectTypeServiceProvider,
    SubjectTypeProfile,
    RoomProfile,
  ],
})
export class EducationModule {}
