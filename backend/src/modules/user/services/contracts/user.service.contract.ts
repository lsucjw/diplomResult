import { User } from '../../models/domains/user.domain';

export abstract class UserService {
  abstract getAll(): Promise<User[]>;
  abstract create(user: User): Promise<User>;
  abstract delete(id: number): Promise<User>;
  abstract isExistUserByEmail(email: string): Promise<boolean>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract addManyByNames(
    values: {
      firstName: string;
      middleName?: string;
      surName: string;
    }[],
  ): Promise<void>;
}
