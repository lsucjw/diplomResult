import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { ProfileEntity } from './profile.entity';
import { Profile } from '../domains/profile.domain';

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

  @Column({ nullable: true })
  profileId?: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId' })
  profile?: Profile;
}
