import { MigrationInterface, QueryRunner } from 'typeorm';
import { SubjectTypeEntity } from '../../../modules/education/models/entities/subject-type.entity';

export class FillSubjectKindsAndTypes1738336544182
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const types = [
      { name: 'Математика' },
      { name: 'Русский' },
      { name: 'Физра' },
    ] satisfies Partial<SubjectTypeEntity>[];

    await Promise.all(
      types.map((type) =>
        queryRunner.query(`INSERT INTO subject_types ("name") VALUES ($1)`, [
          type.name,
        ]),
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
