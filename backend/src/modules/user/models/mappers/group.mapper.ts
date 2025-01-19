import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';
import { MapperBase } from '../../../../utils/mapper/mapper-base.util';

export class GroupMapper extends MapperBase<GroupDto, Group, GroupEntity> {
  constructor() {
    super(GroupDto, Group, GroupEntity);
  }

  protected transformToEntity(domain: Group) {
    return this.plainToEntity({
      ...domain,
      users: [],
    });
  }

  protected transformToDto(domain: Group) {
    return this.plainToDto({
      id: domain.id,
      name: domain.name,
    });
  }

  protected transformDtoToDomain(dto: GroupDto) {
    return this.plainToDomain({
      testValue: 'Тест',
      ...dto,
    });
  }

  protected transformEntityToDomain(entity: GroupEntity) {
    return this.plainToDomain({
      testValue: 'Говнест',
      ...entity,
    });
  }
}
