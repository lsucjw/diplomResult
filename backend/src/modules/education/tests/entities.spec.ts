import { TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { FixtureGeneratorDB, FixtureManager } from 'fixture-lite';
import { RoomEntity } from '../models/entities/room.entity';
import { TestHelpUtil } from '../../../tests/utils/test-help.util';

describe('...', () => {
  let connection: DataSource;
  let module: TestingModule;
  let generator: FixtureGeneratorDB;

  beforeEach(async () => {
    module = await TestHelpUtil.create([RoomEntity]);

    connection = module.get(DataSource);
    generator = await FixtureManager.createGenerator(connection);

    await generator
      .entity(RoomEntity)
      .transform((user) => {
        user.name = 'Jack Sparrow';
        return user;
      })
      .save(1);
  });

  it('...', async () => {
    const [savedRoom] = await connection.getRepository(RoomEntity).find();

    expect(savedRoom).toBeDefined();
    expect(savedRoom.name).toEqual('Jack Sparrow');
  });

  afterEach(async () => {
    await connection.destroy();
  });
});
