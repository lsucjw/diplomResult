import { Injectable } from '@nestjs/common';
import { Group } from '../models/domains/group.domain';
import { GroupService } from './contracts/group.service.contract';
import { GroupMapper } from '../models/mappers/group.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from '../models/entities/group.entity';

@Injectable()
export class GroupServiceImpl extends GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {
    super();
  }

  async getAll(): Promise<Group[]> {
    const entitys = await this.groupRepository.find();
    const models = GroupMapper.to().domains(entitys);
    return models;
  }
}
