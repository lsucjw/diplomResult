import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServiceProvider } from './services/providers/user.service.provider';
import { GroupController } from './controllers/group.controller';
import { GroupServiceProvider } from './services/providers/group.service.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './models/entities/group.entity';
import { UserEntity } from './models/entities/user.entity';
import { ProfileEntity } from './models/entities/profile.entity';
import { GroupProfile } from './models/profiles/group.profile';
import { CreateUserProfile } from './models/profiles/create-user.profile';
import { ProfileProfile } from './models/profiles/profile.profile';
import { UserProfile } from './models/profiles/user.profile';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity, ProfileEntity])],
  controllers: [UserController, GroupController],
  providers: [
    UserServiceProvider,
    GroupServiceProvider,
    GroupProfile,
    ProfileProfile,
    CreateUserProfile,
    UserProfile,
  ],
  exports: [UserServiceProvider, GroupServiceProvider],
})
export class UserModule {}
