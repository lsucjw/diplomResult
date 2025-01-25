import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';
import { MapperBase } from '../../../../utils/mapper/mapper-base.util';

export class GroupMapper extends MapperBase {
  static toEntity(domain: Group): GroupEntity {
    return this.adaptToEntity(GroupEntity, domain);
  }

  static toDto(domain: Group): Promise<GroupDto> {
    return this.adaptToDto(GroupDto, {
      id: domain.id,
      name: domain.name,
    });
  }

  static dtoToDomain(dto: GroupDto): Group {
    return this.adaptToDomain(Group, dto);
  }

  static entityToDomain(entity: GroupEntity): Group {
    return this.adaptToDomain(Group, entity);
  }
}
