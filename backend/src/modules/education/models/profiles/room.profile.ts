import { BaseMapperProfile, ProfileMapperInterface } from '@mappers/core';
import { RoomEntity } from '../entities/room.entity';
import { Room } from '../domains/room.domain';

export class RoomProfile extends BaseMapperProfile {
  async define(mapper: ProfileMapperInterface) {
    mapper
      .addRule(RoomEntity, Room)
      .properties((x) => [x.id, x.name, x.building]);
    mapper
      .addRule(Room, RoomEntity)
      .properties((x) => [x.id, x.name, x.building]);
  }
}
