import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domains/user.domain';
import { GroupMapper } from './group.mapper';
import { Role } from '../role.enum';

export class UserMapper extends MapperBase<UserDto, User, UserEntity> {
  constructor() {
    super(UserDto, User, UserEntity);
  }

  protected toDto(domain: User): Promise<UserDto> {
    return this.plainToDto({
      id: domain.id,
      group: domain.group,
      role: domain.role,
    });
  }
  protected toEntity(domain: User): UserEntity {
    return this.plainToEntity({
      id: domain.id,
      role: domain.role,
      groupId: domain.group.id,
      group: GroupMapper.to().entity(domain.group),
      profileId: null,
      profile: null,
    });
  }
  protected dtoToDomain(dto: UserDto): User {
    return this.plainToDomain({
      id: dto.id,
      role: dto.role,
      group: GroupMapper.to().domain(dto.group),
    });
  }
  protected entityToDomain(entity: UserEntity): User {
    return this.plainToDomain({
      id: entity.id,
      role: Role[entity.role],
      group: GroupMapper.to().domain(entity.group),
    });
  }
}
