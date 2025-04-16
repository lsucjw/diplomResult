import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';

// Тип: Практика лекция...
@Entity('event_kinds')
export class EventKindEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => EventEntity, (event) => event.kind)
  events: EventEntity[];
}
