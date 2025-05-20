import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { SubjectType } from '../domains/subject-type.domain';
import { SubjectTypeEntity } from '../entities/subject-type.entity';

export class SubjectTypeProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface) {
    mapper
      .addRule(SubjectTypeEntity, SubjectType)
      .properties((x) => [x.id, x.name]);
    mapper
      .addRule(SubjectType, SubjectTypeEntity)
      .properties((x) => [x.id, x.name]);
  }
}
