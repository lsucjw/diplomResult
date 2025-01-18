import { Group } from '../../models/domains/group.domain';

export abstract class GroupService {
  abstract getAll(): Promise<Group[]>;
}
