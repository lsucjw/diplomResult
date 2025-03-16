import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Кабинет
@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  building: string;
}
