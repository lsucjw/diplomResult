import { Provider } from '@nestjs/common';
import { RoomService } from '../contracts/room.service.contract';
import { RoomServiceImpl } from '../room.service.impl';

export const RoomServiceProvider = {
  provide: RoomService,
  useClass: RoomServiceImpl,
} satisfies Provider;
