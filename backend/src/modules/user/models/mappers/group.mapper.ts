import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';
import { MapperBase } from '../../../../utils/mapper/mapper-base.util';

export class GroupMapper extends MapperBase<GroupDto, Group, GroupEntity> {
  constructor() {
    super(GroupDto, Group, GroupEntity);
  }

  protected toEntity(domain: Group) {
    return this.plainToEntity({
      ...domain,
      users: [],
    });
  }

  protected toDto(domain: Group) {
    return this.plainToDto({
      id: domain.id,
      name: domain.name,
    });
  }

  protected dtoToDomain(dto: GroupDto) {
    return this.plainToDomain({
      testValue: 'Тест',
      ...dto,
    });
  }

  protected entityToDomain(entity: GroupEntity) {
    return this.plainToDomain({
      testValue: 'Говнест',
      ...entity,
    });
  }
}
