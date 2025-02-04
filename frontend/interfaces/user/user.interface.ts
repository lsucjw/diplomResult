import { Role } from "./role.enum";
import { Group } from "./group.interface";
import { Profile } from "./profile.interface";

export interface User {
  id: number;
  email: string;
  role: Role;
  group: Group;
  profile: Profile;
}
