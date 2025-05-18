import { InjectMapper, MapperInterface } from '@mappers/nest';
import { RoomService } from './contracts/room.service.contract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../models/entities/room.entity';
import { Room } from '../models/domains/room.domain';

export class RoomServiceImpl extends RoomService {
  constructor(
    @InjectMapper()
    private readonly mapper: MapperInterface,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {
    super();
  }

  async addOrUpdate(rooms: Room[]) {
    const entities = await this.mapper.autoMap(rooms, RoomEntity);
    await this.roomRepository.upsert(entities, ['name']);
  }
}
