import { NotImplementedException } from '@nestjs/common';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { validateOrReject } from 'class-validator';

export abstract class MapperBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static modelToDto(entity: object): Promise<object> {
    throw new NotImplementedException('Method modelToDto not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static modelToEntity(model: object): object {
    throw new NotImplementedException('Method modelToEntity not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static dtoToModel(model: object): object {
    throw new NotImplementedException('Method dtoToModel not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static entityToModel(model: object): object {
    throw new NotImplementedException('Method entityToModel not implemented');
  }

  protected static modelsToDtosBase<T extends object>(
    constructor: ClassConstructor<T>,
    entities: T[],
  ): Promise<T[]> {
    return Promise.all(entities.map((x) => this.modelToDto(x))) as Promise<T[]>;
  }

  protected static modelsToEntitiesBase<T extends object>(
    constructor: ClassConstructor<T>,
    entities: Partial<T>[],
  ): T[] {
    return entities.map((x) => this.modelToEntity(x)) as T[];
  }

  protected static dtosToModelsBase<T extends object>(
    constructor: ClassConstructor<T>,
    entities: Partial<T>[],
  ): T[] {
    return entities.map((x) => this.dtoToModel(x)) as T[];
  }

  protected static entitiesToModelsBase<T extends object>(
    constructor: ClassConstructor<T>,
    entities: Partial<T>[],
  ): T[] {
    return entities.map((x) => this.entityToModel(x)) as T[];
  }

  protected static to<T extends object>(
    constructor: ClassConstructor<T>,
    value: Partial<T>,
    options?: ClassTransformOptions,
  ): T {
    return plainToInstance(constructor, value, options);
  }

  protected static async toForDto<T extends object>(
    constructor: ClassConstructor<T>,
    value: T,
    options?: ClassTransformOptions,
  ): Promise<T> {
    const instance = plainToInstance(constructor, value, options);
    await validateOrReject(instance, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    return instance;
  }
}
