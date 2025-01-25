import { Role } from '../role.enum';
import { Group } from './group.domain';
import { Profile } from './profile.domain';

export class User {
  id: number;
  role: Role;
  group: Group;
  profile: Profile;
}
