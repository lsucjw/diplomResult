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
import { GroupEntity } from '../../../user/models/entities/group.entity';

// Конкретный предмет с преподом
@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'subject_type_id', type: 'int' })
  subjectTypeId: number;

  @ManyToOne(() => SubjectTypeEntity, (subjectType) => subjectType.id)
  @JoinColumn({ name: 'subject_type_id' })
  subjectType: SubjectTypeEntity;

  @Column({ type: 'int' })
  groupId: number;

  @OneToOne(() => GroupEntity, (group) => group.id)
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;

  @Column({ type: 'int', name: 'sub_group' })
  subGroup: number;

  @Column({ name: 'professor_id', type: 'int', nullable: true })
  professorId: number | null;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
  @JoinColumn({ name: 'professor_id' })
  professor: UserEntity | null;
}
