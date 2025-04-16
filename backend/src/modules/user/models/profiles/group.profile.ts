import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { Group } from '../domains/group.domain';
import { GroupDto } from '../dtos/group.dto';
import { GroupEntity } from '../entities/group.entity';

export class GroupProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface) {
    mapper.addRule(Group, GroupDto).properties((x) => [x.id, x.name]);
    mapper.addRule(GroupEntity, Group).properties((x) => [x.id, x.name]);
    mapper.addRule(Group, GroupEntity).properties((x) => [x.id, x.name]);
  }
}
