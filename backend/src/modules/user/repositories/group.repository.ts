import { Repository } from 'typeorm';
import { GroupEntity } from '../models/entities/group.entity';

export class GroupRepository extends Repository<GroupEntity> {}
