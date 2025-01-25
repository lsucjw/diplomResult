import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { User } from '../domains/user.domain';
import { Role } from '../role.enum';
import { GroupMapper } from './group.mapper';
import { ProfileMapper } from './profile.mapper';

export class CreateUserRequestMapper extends MapperBase {
  static dtoToDomain(dto: CreateUserRequestDto): User {
    return this.adaptToDomain(User, {
      id: 0,
      role: Role[dto.role],
      group: GroupMapper.dtoToDomain({
        id: dto.groupId,
        name: '',
      }),
      profile: ProfileMapper.dtoToDomain({
        firstName: dto.firstName,
        surName: dto.surName,
        middleName: dto.middleName,
      }),
    });
  }
}
