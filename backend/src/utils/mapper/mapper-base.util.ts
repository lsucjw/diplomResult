import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NotImplementedException } from '@nestjs/common';

export enum SourceType {
  Dto,
  Domain,
  Entity,
}

export abstract class MapperBase<Dto, Domain, Entity = undefined> {
  protected constructor(
    protected dtoConstructor: ClassConstructor<Dto>,
    protected domainConstructor?: ClassConstructor<Domain>,
    protected entityConstructor?: ClassConstructor<Entity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected transformDtoToDomain(dto: Dto): Domain {
    throw new NotImplementedException(
      'No implementation found transformDtoToDomain',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected transformToDto(domain: Domain): Promise<Dto> {
    throw new NotImplementedException('No implementation found transformToDto');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected transformToEntity(domain: Domain): Entity {
    throw new NotImplementedException(
      'No implementation found transformToEntity',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected transformEntityToDomain(entity: Entity): Domain {
    throw new NotImplementedException(
      'No implementation found transformEntityToDomain',
    );
  }

  protected async plainToDto(value: Dto, options?: ClassTransformOptions) {
    const instance = plainToInstance(this.dtoConstructor, value, options);
    await validateOrReject(instance as object, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    return instance;
  }

  // TODO Сделать исключения свойств которых нет в Domain
  protected plainToDomain(value: Domain, options?: ClassTransformOptions) {
    return plainToInstance(this.domainConstructor, value, options);
  }

  // TODO Сделать исключения свойств которых нет в Entity
  protected plainToEntity(value: Entity, options?: ClassTransformOptions) {
    if (!this.entityConstructor) {
      throw new NotImplementedException('EntityConstructor not found');
    }
    return plainToInstance(this.entityConstructor, value, options);
  }

  async dto(domain: Domain) {
    if (!this.dtoConstructor) {
      throw new Error('The constructor for the Dto is not defined.');
    }

    return this.validateObjectHowInstance(
      this.dtoConstructor,
      await this.transformToDto(domain),
    );
  }

  async dtos(domains: Domain[]) {
    return Promise.all(domains.map((domain) => this.dto(domain)));
  }

  entity(domain: Domain) {
    if (!this.entityConstructor) {
      throw new Error('The constructor for the Entity is not defined.');
    }

    return this.validateObjectHowInstance(
      this.entityConstructor,
      this.transformToEntity(domain),
    );
  }

  entities(domains: Domain[]) {
    return domains.map((domain) => this.entity(domain));
  }

  domain(
    entityOrDto: Entity | Dto,
    sourceType?: SourceType.Entity | SourceType.Dto,
  ) {
    return this.entityOrDtoInner(entityOrDto, sourceType);
  }

  domains(
    entitiesOrDtos: Entity[] | Dto[],
    sourceType?: SourceType.Entity | SourceType.Dto,
  ) {
    return entitiesOrDtos.map((entityOrDto: Entity | Dto) =>
      this.entityOrDtoInner(entityOrDto, sourceType),
    );
  }

  private entityOrDtoInner(
    entityOrDto: Entity | Dto,
    sourceType?: SourceType.Entity | SourceType.Dto,
  ) {
    if (entityOrDto === undefined) {
      return undefined;
    }

    if (entityOrDto === null) {
      return null;
    }

    if (
      sourceType == SourceType.Entity ||
      (this.entityConstructor && entityOrDto instanceof this.entityConstructor)
    ) {
      return this.validateObjectHowInstance(
        this.domainConstructor,
        this.transformEntityToDomain(entityOrDto as Entity),
      );
    } else if (
      sourceType == SourceType.Dto ||
      (this.dtoConstructor && entityOrDto instanceof this.dtoConstructor)
    ) {
      return this.validateObjectHowInstance(
        this.domainConstructor,
        this.transformDtoToDomain(entityOrDto as Dto),
      );
    }

    throw new Error(
      'The prototype of the original object is not a Dto or Entity. If you are passing an anonymous object, specify the second argument (sourceType) to determine the type.',
    );
  }

  private validateObjectHowInstance<T>(
    constructor: ClassConstructor<T>,
    value: T,
  ): T {
    const objectIsNullOrUndefined = value === null || value === undefined;
    if (objectIsNullOrUndefined || value instanceof constructor) {
      return value;
    }

    throw new Error(
      `The resulting object is not an instance of the prototype ${constructor.name}`,
    );
  }

  static to<T>(this: new () => T): T {
    // TODO Нужно что бы катался один инстанс
    return new this();
  }
}
