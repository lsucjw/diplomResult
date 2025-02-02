import { MigrationInterface, QueryRunner } from 'typeorm';
import { EventKindEntity } from '../../../modules/education/models/entities/event-kind.entity';

export class NewMigrations1738347803417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const kinds = [
      { name: 'Лекция' },
      { name: 'Практика' },
      { name: 'Лабораторная работа' },
      { name: 'Экзамен' },
      { name: 'Зачет' },
      { name: 'Консультация' },
    ] satisfies Partial<EventKindEntity>[];

    await Promise.all(
      kinds.map((kind) =>
        queryRunner.query(`INSERT INTO event_kinds ("name") VALUES ($1)`, [
          kind.name,
        ]),
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
