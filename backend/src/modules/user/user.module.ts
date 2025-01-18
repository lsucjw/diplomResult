import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServiceProvider } from './services/providers/user.service.provider';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repositories/group.repository';
import { GroupServiceProvider } from './services/providers/group.service.provider';

@Module({
  controllers: [UserController, GroupController],
  providers: [UserServiceProvider, GroupServiceProvider, GroupRepository],
})
export class UserModule {}
