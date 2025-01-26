import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domains/user.domain';
import { GroupMapper } from './group.mapper';
import { Role } from '../role.enum';
import { ProfileMapper } from './profile.mapper';

export class UserMapper extends MapperBase {
  static async toDto(domain: User): Promise<UserDto> {
    return this.adaptToDto(UserDto, {
      id: domain.id,
      email: domain.email,
      group: await GroupMapper.toDto(domain.group),
      role: domain.role,
      profile: await ProfileMapper.toDto(domain.profile),
    });
  }

  static toEntity(domain: User): UserEntity {
    return this.adaptToEntity(UserEntity, {
      id: domain.id,
      email: domain.email,
      role: domain.role,
      groupId: domain.group.id,
      group: GroupMapper.toEntity(domain.group),
      profile: ProfileMapper.toEntity(domain.profile),
    });
  }

  static entityToDomain(entity: UserEntity): User {
    return this.adaptToDomain(User, {
      id: entity.id,
      email: entity.email,
      role: Role[entity.role],
      group: GroupMapper.entityToDomain(entity.group),
      profile: entity.profile
        ? ProfileMapper.entityToDomain({
            id: undefined,
            ...entity.profile,
          })
        : undefined,
    });
  }
}
