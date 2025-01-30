import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectTypeEntity } from './models/entities/subject-type.entity';
import { SubjectEntity } from './models/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectTypeEntity, SubjectEntity])],
})
export class EducationModule {}
