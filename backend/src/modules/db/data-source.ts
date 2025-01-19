import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/models/entities/user.entity';
import { GroupEntity } from '../user/models/entities/group.entity';
import { ProfileEntity } from '../user/models/entities/profile.entity';

const migrationsPath =
  process.env.NODE_ENV === 'migration'
    ? ['src/modules/db/migrations/*.ts']
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
  entities: [UserEntity, GroupEntity, ProfileEntity],
  migrations: migrationsPath,
};

export default new DataSource(config);
