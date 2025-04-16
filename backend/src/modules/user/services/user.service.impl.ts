import { UserService } from './contracts/user.service.contract';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entities/user.entity';
import { User } from '../models/domains/user.domain';
import { InjectMapper, MapperInterface } from '@mappers/nest';

@Injectable()
export class UserServiceImpl extends UserService {
  constructor(
    @InjectMapper() private readonly mapper: MapperInterface,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async getAll(): Promise<User[]> {
    const entities = await this.userRepository.find({
      relations: {
        group: true,
        profile: true,
      },
    });

    return this.mapper.autoMap(entities, User);
  }

  async create(user: User): Promise<User> {
    const savedEntity = await this.mapper.autoMap(user, UserEntity);
    const entity = await this.userRepository.save(savedEntity);

    return this.mapper.autoMap(entity, User);
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
    return this.mapper.autoMap(entity, User);
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

    return this.mapper.autoMap(userEntity, User);
  }
}
