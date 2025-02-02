import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { FixtureGeneratorDB, FixtureManager } from 'fixture-lite';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../models/entities/room.entity';

describe('...', () => {
  let connection: DataSource;
  let module: TestingModule;
  let generator: FixtureGeneratorDB;

  beforeEach(async () => {
    const entities = [RoomEntity];
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities,
          synchronize: true,
        }),
        TypeOrmModule.forFeature(entities),
      ],
    }).compile();

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
