import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { UserDto } from '../dtos/user.dto';
import { User } from '../domains/user.domain';
import { ProfileDto } from '../dtos/profile.dto';
import { Profile } from '../domains/profile.domain';
import { UserEntity } from '../entities/user.entity';
import { GroupDto } from '../dtos/group.dto';
import { Group } from '../domains/group.domain';
import { GroupEntity } from '../entities/group.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { Role } from '../role.enum';

export class UserProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface) {
    mapper
      .addRule(UserDto, User)
      .properties((x) => [x.id, x.email, x.role])
      .byRule(
        (x) => x.profile,
        (x) => x.profile,
        mapper.withRule(ProfileDto, Profile),
      )
      .byRule(
        (x) => x.group,
        (x) => x.group,
        mapper.withRule(GroupDto, Group),
      );

    mapper
      .addRule(User, UserDto)
      .properties((x) => [x.id, x.email, x.role])
      .byRule(
        (x) => x.profile,
        (x) => x.profile,
        mapper.withRule(Profile, ProfileDto),
      )
      .byRule(
        (x) => x.group,
        (x) => x.group,
        mapper.withRule(Group, GroupDto),
      );

    mapper
      .addRule(User, UserEntity)
      .properties((x) => [x.id, x.email])
      .property(
        (x) => x.role,
        (x) => x.role,
        (x) => Role[x],
      )
      .byRule(
        (x) => x.profile,
        (x) => x.profile,
        mapper.withRule(Profile, ProfileEntity),
      )
      .byRule(
        (x) => x.group,
        (x) => x.group,
        mapper.withRule(Group, GroupEntity),
      );

    mapper
      .addRule(UserEntity, User)
      .properties((x) => [x.email, x.id])
      .property(
        (x) => x.role,
        (x) => x.role,
        (x) => Role[x],
      )
      .byRule(
        (x) => x.group,
        (x) => x.group,
        mapper.withRule(GroupEntity, Group),
      )
      .byRule(
        (x) => x.profile,
        (x) => x.profile,
        mapper.withRule(ProfileEntity, Profile),
      );
  }
}
