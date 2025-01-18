import { UserDto } from '../../models/dtos/user.dto';

export abstract class UserService {
  abstract getAll(): UserDto[];
  abstract create(userDto: UserDto): UserDto;
  abstract delete(id: number): void;
}
