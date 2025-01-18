import { ClassConstructor } from 'class-transformer';

export abstract class MapperBase<Dto, Domain, Entity> {
  protected constructor(
    protected dtoConstructor: ClassConstructor<Dto>,
    protected domainConstructor: ClassConstructor<Domain>,
    protected entityConstructor: ClassConstructor<Entity>,
  ) {}

  protected abstract transformToDto(domain: Domain): Dto;
  protected abstract transformToEntity(domain: Domain): Entity;
  protected abstract transformDtoToDomain(dto: Dto): Domain;
  protected abstract transformEntityToDomain(entity: Entity): Domain;

  Dto(domain: Domain) {
    return this.transformToDto(domain);
  }

  Dtos(domains: Domain[]) {
    return domains.map((domain) => this.transformToDto(domain));
  }

  Entity(domain: Domain) {
    return this.transformToEntity(domain);
  }

  Entities(domains: Domain[]) {
    return domains.map((domain) => this.transformToEntity(domain));
  }

  Domain(entityOrDto: Entity | Dto) {
    return this.entityOrDtoInner(entityOrDto);
  }

  Domains(entitiesOrDtos: Entity[] | Dto[]) {
    return entitiesOrDtos.map((entityOrDto: Entity | Dto) =>
      this.entityOrDtoInner(entityOrDto),
    );
  }

  private entityOrDtoInner(entityOrDto: Entity | Dto) {
    if (entityOrDto instanceof this.entityConstructor) {
      return this.transformEntityToDomain(entityOrDto);
    } else if (entityOrDto instanceof this.dtoConstructor) {
      return this.transformDtoToDomain(entityOrDto);
    }

    throw new Error();
  }

  static to<T>(this: new () => T): T {
    return new this();
  }
}
