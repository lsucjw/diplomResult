import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectEntity } from './subject.entity';

@Entity('subject_types')
export class SubjectTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.subjectType)
  subjects: SubjectEntity[];
}
