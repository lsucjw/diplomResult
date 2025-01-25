import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateProfileTable1737297472392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'middleName',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'surName',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'profileId',
        type: 'int',
        isNullable: true,
        isGenerated: false,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['profileId'],
        referencedTableName: 'profiles',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'profiles',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'NO ACTION',
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_: QueryRunner): Promise<void> {}
}
