import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class FavoriteConsultationsTable1738349718397
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorite_consultations',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'consultation_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('favorite_consultations', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
      }),
      new TableForeignKey({
        columnNames: ['consultation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'consultations',
        onDelete: 'NO ACTION',
      }),
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
