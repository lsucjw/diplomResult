import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from '../../../user/models/entities/user.entity';

@Entity('consultations')
export class ConsultationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  roomId: number;

  @OneToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @Column({ type: 'int' })
  professorId: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  professor: UserEntity;
}
