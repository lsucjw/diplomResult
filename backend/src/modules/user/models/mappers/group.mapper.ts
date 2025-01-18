import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';
import { MapperBase } from '../../../../utils/mapper/mapper-base.util';

export class GroupMapper extends MapperBase<GroupDto, Group, GroupEntity> {
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
