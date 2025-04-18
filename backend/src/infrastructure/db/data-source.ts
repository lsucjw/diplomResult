import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../modules/user/models/entities/user.entity';
import { GroupEntity } from '../../modules/user/models/entities/group.entity';
import { ProfileEntity } from '../../modules/user/models/entities/profile.entity';
import { SubjectEntity } from '../../modules/education/models/entities/subject.entity';
import { SubjectTypeEntity } from '../../modules/education/models/entities/subject-type.entity';
import { EventKindEntity } from '../../modules/education/models/entities/event-kind.entity';
import { RoomEntity } from '../../modules/education/models/entities/room.entity';
import { ConsultationEntity } from '../../modules/education/models/entities/consultation.entity';
import { EventEntity } from '../../modules/education/models/entities/event.entity';
import { FavoriteConsultationEntity } from '../../modules/education/models/entities/favorite-consultation.entity';

const migrationsPath =
  process.env.NODE_ENV === 'migration'
    ? ['src/infrastructure/db/migrations/*.ts']
    : [];

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [
    ...[UserEntity, GroupEntity, ProfileEntity],
    ...[
      SubjectEntity,
      SubjectTypeEntity,
      EventKindEntity,
      RoomEntity,
      ConsultationEntity,
      EventEntity,
      FavoriteConsultationEntity,
    ],
  ],
  migrations: migrationsPath,
};

export default new DataSource(config);
