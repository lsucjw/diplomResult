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
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'middle_name',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'sur_name',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'user_id',
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
        name: 'profile_id',
        type: 'int',
        isNullable: true,
        isGenerated: false,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['profile_id'],
        referencedTableName: 'profiles',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'profiles',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'NO ACTION',
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_: QueryRunner): Promise<void> {}
}
