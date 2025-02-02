import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectTypeEntity } from './subject-type.entity';
import { UserEntity } from '../../../user/models/entities/user.entity';

@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'subject_type_id', type: 'int' })
  subjectTypeId: number;

  @ManyToOne(() => SubjectTypeEntity, (subjectType) => subjectType.id)
  @JoinColumn({ name: 'subject_type_id' })
  subjectType: SubjectTypeEntity;

  @Column({ name: 'professor_id', type: 'int', nullable: true })
  professorId: number | null;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
  @JoinColumn({ name: 'professor_id' })
  professor: UserEntity | null;
}
