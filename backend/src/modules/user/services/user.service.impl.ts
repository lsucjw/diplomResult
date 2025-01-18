import { UserDto } from '../models/dtos/user.dto';
import { UserService } from './contracts/user.service.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceImpl extends UserService {
  userStore: UserDto[] = [];

  getAll(): UserDto[] {
    return this.userStore;
  }
  create(userDto: UserDto): UserDto {
    this.userStore.push(userDto);
    return userDto;
  }
  delete(id: number): void {
    const userIndex = this.userStore.findIndex((x) => x.id === id);
    this.userStore.splice(userIndex, 1);
  }
}
