import { Group } from '../../models/domains/group.domain';

export abstract class GroupService {
  abstract getAll(): Promise<Group[]>;
  abstract addOrUpdate(groups: Group[]): Promise<void>;
}
