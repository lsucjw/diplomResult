import { Group } from '../domains/group.domain';
import { GroupDto } from '../dtos/group.dto';
import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { GroupEntity } from '../entities/group.entity';
import { ClassConstructor } from 'class-transformer';

export class GroupMapper extends MapperBase {
  private constructor() {
    super();
  }

  static modelToDto(model: Group): Promise<GroupDto> {
    return this.toForDto(GroupDto, model);
  }

  static modelsToDtos(models: Group[]): Promise<GroupDto[]> {
    return this.modelsToDtosBase(GroupDto, models);
  }

  static modelToEntity(model: Group): GroupEntity {
    return this.to(GroupEntity, model);
  }

  static modelsToEntities(models: Group[]): GroupEntity[] {
    return this.modelsToEntitiesBase(GroupEntity, models);
  }

  static entityToModel(entity: GroupEntity): Group {
    return this.to(Group, entity);
  }

  static entitiesToModels(models: GroupEntity[]): Group[] {
    return this.entitiesToModelsBase(Group, models);
  }

  static dtoToModel(dto: GroupDto): Group {
    return this.to(Group, { ...dto, testValue: 'testValue' });
  }

  static dtosToModels(dtos: GroupDto[]): Group[] {
    return this.dtosToModelsBase(Group, dtos);
  }
}

abstract class MapperTest<Dto, Domain, Entity> {
  protected constructor(
    protected dtoConstructor: ClassConstructor<Dto>,
    protected domainConstructor: ClassConstructor<Domain>,
    protected entityConstructor: ClassConstructor<Entity>,
  ) {}

  protected abstract transformToDto(domain: Domain): Dto {
    return {} as Dto;
  }

  Dto(domain: Domain) {
    return this.transformToDto(domain);
  }
}

export class GroupMapperMy extends MapperTest<GroupDto, Group, GroupEntity> {
  private constructor() {
    super(GroupDto, Group, GroupEntity);
  }

  transformToDto(domain: Group) {
    return domain as GroupDto;
  }

  static get to() {
    return new this();
  }
}

GroupMapperMy.to.Dto()

////////////////

class B {
  static to<T>(this: new () => T): T {
    return new this();
  }
}

class A extends B {
  // Дополнительные свойства и методы класса A
  public someProperty: string;

  constructor() {
    super();
    this.someProperty = 'example';
  }
}

// Пример использования
const instanceA = A.to();
console.log(instanceA instanceof A); // true
console.log(instanceA.someProperty); // 'example'