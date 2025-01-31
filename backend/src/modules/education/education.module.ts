import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectTypeEntity } from './models/entities/subject-type.entity';
import { SubjectEntity } from './models/entities/subject.entity';
import { EventKindEntity } from './models/entities/event-kind.entity';
import { RoomEntity } from './models/entities/room.entity';
import { ConsultationEntity } from './models/entities/consultation.entity';
import { EventEntity } from './models/entities/event.entity';
import { FavoriteConsultationEntity } from './models/entities/favorite-consultation.entity';

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
  ],
})
export class EducationModule {}
