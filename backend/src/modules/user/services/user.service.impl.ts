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
        profile: true,
      },
    });

    return entitys.map((x) => UserMapper.entityToDomain(x));
  }

  async create(user: User): Promise<User> {
    const savedEntity = UserMapper.toEntity(user);
    const entity = await this.userRepository.save(savedEntity);

    return UserMapper.entityToDomain(entity);
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
    return UserMapper.entityToDomain(entity);
  }

  async isExistUserByEmail(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }

  async getUserByEmail(email: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
      relations: {
        group: true,
        profile: true,
      },
    });

    return UserMapper.entityToDomain(userEntity);
  }
}
