import { FixtureManager } from 'fixture-lite';
import { RoomEntity } from '../../models/entities/room.entity';

FixtureManager.factories.add(RoomEntity, (faker) => {
  return {
    name: faker.commerce.department(),
    building: faker.location.streetAddress(),
  };
});
