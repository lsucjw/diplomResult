import { Role } from '../role.enum';
import { Group } from './group.domain';

export class User {
  id: number;
  role: Role;
  group: Group;
}
