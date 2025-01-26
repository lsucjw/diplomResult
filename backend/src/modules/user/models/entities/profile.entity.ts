import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  surName: string;

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  user?: UserEntity;

  @Column({ nullable: true })
  userId?: number;
}
