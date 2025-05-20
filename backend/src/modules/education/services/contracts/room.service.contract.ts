import { Room } from '../../models/domains/room.domain';

export abstract class RoomService {
  abstract addOrUpdate(rooms: Room[]): Promise<void>;
}
