import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { validateOrReject } from 'class-validator';

type IsMethod<T> = T extends (...args: any[]) => any ? true : false;
type ClassFields<T> = Pick<
  T,
  {
    [K in keyof T]: IsMethod<T[K]> extends true ? never : K;
  }[keyof T]
>;

export abstract class MapperBase {
  protected static adaptToDtos<T extends object>(
    constructor: ClassConstructor<T>,
    values: ClassFields<T>[],
    options?: ClassTransformOptions,
  ): Promise<T[]> {
    return Promise.all(
      values.map((x) => this.adaptToDto(constructor, x, options)),
    ) as Promise<T[]>;
  }

  protected static async adaptToDto<T extends object>(
    constructor: ClassConstructor<T>,
    value: ClassFields<T>,
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

  protected static adaptToEntity<T extends object>(
    constructor: ClassConstructor<T>,
    value: Partial<ClassFields<T>>,
    options?: ClassTransformOptions,
  ): T {
    return plainToInstance(constructor, value, options);
  }

  protected static adaptToDomain<T extends object>(
    constructor: ClassConstructor<T>,
    value: Partial<ClassFields<T>>,
    options?: ClassTransformOptions,
  ): T {
    return plainToInstance(constructor, value, options);
  }
}
