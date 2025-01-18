import { Injectable } from '@nestjs/common';
import { Group } from '../models/domains/group.domain';
import { GroupService } from './contracts/group.service.contract';
import { GroupRepository } from '../repositories/group.repository';
import { GroupMapper } from '../models/mappers/group.mapper';

@Injectable()
export class GroupServiceImpl extends GroupService {
  constructor(private readonly groupRepository: GroupRepository) {
    super();
  }
  async getAll(): Promise<Group[]> {
    const entitys = await this.groupRepository.find();
    const models = GroupMapper.entitiesToModels(entitys);
    return models;
  }
}
