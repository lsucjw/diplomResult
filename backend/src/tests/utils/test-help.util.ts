import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export class TestHelpUtil {
  static async create(
    entities: (new (...arg: any[]) => any)[],
    providers?: Provider[],
  ): Promise<TestingModule> {
    return await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities,
          synchronize: true,
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: providers ?? [],
    }).compile();
  }
}
