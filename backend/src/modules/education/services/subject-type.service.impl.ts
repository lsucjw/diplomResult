import { InjectMapper, MapperInterface } from '@mappers/nest';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectTypeEntity } from '../models/entities/subject-type.entity';
import { SubjectType } from '../models/domains/subject-type.domain';
import { SubjectTypeService } from './contracts/subject-type.service.contract';

export class SubjectTypeServiceImpl extends SubjectTypeService {
  constructor(
    @InjectMapper()
    private readonly mapper: MapperInterface,
    @InjectRepository(SubjectTypeEntity)
    private readonly subjectTypeRepository: Repository<SubjectTypeEntity>,
  ) {
    super();
  }

  async getAll(): Promise<SubjectType[]> {
    const entities = await this.subjectTypeRepository.find();
    return this.mapper.autoMap(entities, SubjectType);
  }

  async addOrUpdate(subjectTypes: SubjectType[]) {
    const entities = await this.mapper.autoMap(subjectTypes, SubjectTypeEntity);
    await this.subjectTypeRepository.upsert(entities, ['name']);
  }
}
