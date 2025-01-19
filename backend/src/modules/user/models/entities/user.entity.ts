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

  @Column({ type: 'int' })
  profileId: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity;
}
