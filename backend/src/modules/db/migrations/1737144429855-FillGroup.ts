import { MigrationInterface, QueryRunner } from 'typeorm';
import { GroupEntity } from '../../user/models/entities/group.entity';

export class FillGroupe1737144429855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const groups: Partial<GroupEntity>[] = [
      {
        name: '607-11',
      },
      {
        name: '607-12',
      },
    ];

    const promises = groups.map(({ name }) => {
      return queryRunner.query(`INSERT INTO groups (name) VALUES ('${name}')`);
    });

    await Promise.all(promises);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_: QueryRunner): Promise<void> {}
}
