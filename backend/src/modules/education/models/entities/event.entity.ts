import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from '../../../user/models/entities/group.entity';
import { SubjectEntity } from './subject.entity';
import { RoomEntity } from './room.entity';
import { ConsultationEntity } from './consultation.entity';
import { EventKindEntity } from './event-kind.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  startDateTime: Date;

  @Column({ type: 'timestamptz' })
  endDateTime: Date;

  @Column({ type: 'int' })
  roomId: number;

  @OneToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @Column({ type: 'int' })
  kindId: number;

  @OneToOne(() => EventEntity, (event) => event.kind)
  @JoinColumn({ name: 'kind_id' })
  kind: EventKindEntity;

  @Column({ type: 'int', nullable: true })
  subjectId: number | null;

  @OneToOne(() => SubjectEntity, (subject) => subject.id, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity | null;

  @Column({ type: 'int', nullable: true })
  consultationId: number | null;

  @OneToOne(() => ConsultationEntity, (consultation) => consultation.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'consultation_id' })
  consultation: ConsultationEntity | null;
}
