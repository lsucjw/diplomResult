import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  course: number | null;

  @OneToMany(() => UserEntity, (user) => user.group)
  users: UserEntity[];
}
