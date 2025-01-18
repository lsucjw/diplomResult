import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ type: 'int' })
  groupId: number;

  @ManyToOne(() => GroupEntity, (group) => group.users)
  @JoinColumn({ name: 'groupId' })
  group: GroupEntity;
}