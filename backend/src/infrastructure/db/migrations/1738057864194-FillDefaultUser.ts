import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../../modules/user/models/entities/user.entity';
import { ProfileEntity } from '../../../modules/user/models/entities/profile.entity';

export class NewMigrations1738057864194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newUser: UserEntity = await queryRunner.query(
      `INSERT INTO users ("email", "role", "group_id") VALUES ('sukhushina_le@edu.surgu.ru', 'Student', 1) RETURNING *`,
    );

    const newProfile: ProfileEntity = await queryRunner.query(
      `INSERT INTO profiles ("first_name", "middle_name", "sur_name", "user_id") VALUES ('Лариса', 'Евгеньевна', 'Якубчик', ${newUser[0].id}) RETURNING *`,
    );

    await queryRunner.query(
      `UPDATE users SET "profile_id" = ${newProfile[0].id} WHERE id = ${newUser[0].id}`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_: QueryRunner): Promise<void> {}
}
