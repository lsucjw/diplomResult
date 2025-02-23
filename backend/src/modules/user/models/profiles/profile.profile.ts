import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { ProfileDto } from '../dtos/profile.dto';
import { Profile } from '../domains/profile.domain';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface): Promise<void> {
    mapper
      .addRule(ProfileDto, Profile)
      .properties((x) => [x.firstName, x.middleName, x.surName]);

    mapper
      .addRule(Profile, ProfileDto)
      .properties((x) => [x.firstName, x.middleName, x.surName]);

    mapper
      .addRule(Profile, ProfileEntity)
      .properties((x) => [x.firstName, x.middleName, x.surName]);

    mapper
      .addRule(ProfileEntity, Profile)
      .properties((x) => [x.firstName, x.middleName, x.surName]);
  }
}
