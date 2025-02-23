import { Injectable } from '@nestjs/common';
import { Group } from '../models/domains/group.domain';
import { GroupService } from './contracts/group.service.contract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from '../models/entities/group.entity';
import { InjectMapper, MapperInterface } from '@mappers/nest';

@Injectable()
export class GroupServiceImpl extends GroupService {
  constructor(
    @InjectMapper()
    private readonly mapper: MapperInterface,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {
    super();
  }

  async getAll(): Promise<Group[]> {
    const entities = await this.groupRepository.find();
    return this.mapper.autoMap(entities, Group);
  }
}
