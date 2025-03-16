import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { User } from '../domains/user.domain';
import { ProfileDto } from '../dtos/profile.dto';
import { Profile } from '../domains/profile.domain';
import { Group } from '../domains/group.domain';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';

export class CreateUserProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface): Promise<void> {
    mapper
      .addRule(CreateUserRequestDto, User)
      .fill(
        () => 0,
        (x) => x.id,
      )
      .properties((x) => [x.email, x.role])
      .byRule(
        (x) => x.profile,
        (x) => x.profile,
        mapper.withRule(ProfileDto, Profile),
      )
      .fill(
        (from) => {
          const group = new Group();
          group.id = from.groupId;
          group.name = '';
          return group;
        },
        (x) => x.group,
      );

    mapper.addRule(User, CreateUserResponseDto).property(
      (x) => x.id,
      (x) => x.userId,
    );
  }
}
