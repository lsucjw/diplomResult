import { Entity, PrimaryColumn } from 'typeorm';

@Entity('favorite_consultations')
export class FavoriteConsultationEntity {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'consultation_id', type: 'int' })
  consultationId: number;
}
