import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServiceProvider } from './services/providers/user.service.provider';
import { GroupController } from './controllers/group.controller';
import { GroupServiceProvider } from './services/providers/group.service.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './models/entities/group.entity';
import { UserEntity } from './models/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity])],
  controllers: [UserController, GroupController],
  providers: [UserServiceProvider, GroupServiceProvider],
})
export class UserModule {}
