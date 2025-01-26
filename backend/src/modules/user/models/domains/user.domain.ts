import { Role } from '../role.enum';
import { Group } from './group.domain';
import { Profile } from './profile.domain';

export class User {
  id: number;
  email: string;
  role: Role;
  group: Group;
  profile: Profile;
}
