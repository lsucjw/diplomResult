import { ClassConstructor } from 'class-transformer';
import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';

abstract class MapperBase<Dto, Domain, Entity> {
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
    return entitiesOrDtos.map((entityOrDto) =>
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

class GroupMapper extends MapperBase<GroupDto, Group, GroupEntity> {
  constructor() {
    super(GroupDto, Group, GroupEntity);
  }

  protected transformToEntity(domain: Group): GroupEntity {
    throw new Error('Method not implemented.');
  }

  protected transformDtoToDomain(dto: GroupDto): Group {
    throw new Error('Method not implemented.');
  }

  protected transformEntityToDomain(entity: GroupEntity): Group {
    throw new Error('Method not implemented.');
  }

  protected transformToDto(domain: Group): GroupDto {
    throw new Error('Method not implemented.');
  }
}
// Пример использования
const instance1 = GroupMapper.to().Dto({} as Group);
const instance2 = GroupMapper.to().Dtos({} as Group[]);
const instance3 = GroupMapper.to().Domain({} as GroupEntity);
const instance4 = GroupMapper.to().Domains({} as GroupEntity[]);
const instance4 = GroupMapper.to().Domain({} as GroupDto);
const instance4 = GroupMapper.to().Domains({} as GroupDto[]);
const instance4 = GroupMapper.to().Entity({} as Group);
const instance4 = GroupMapper.to().Entities({} as Group[]);
