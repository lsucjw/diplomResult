import { UserService } from './contracts/user.service.contract';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entities/user.entity';
import { User } from '../models/domains/user.domain';
import { UserMapper } from '../models/mappers/user.mapper';

@Injectable()
export class UserServiceImpl extends UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async getAll(): Promise<User[]> {
    const entitys = await this.userRepository.find({
      relations: {
        group: true,
      },
    });

    return UserMapper.to().domains(entitys);
  }

  async create(user: User): Promise<User> {
    const entity = await this.userRepository.save(UserMapper.to().entity(user));
    return UserMapper.to().domain(entity);
  }

  async delete(id: number): Promise<User> {
    const entity = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        group: true,
      },
    });

    await this.userRepository.delete(entity.id);
    return UserMapper.to().domain(entity);
  }
}
