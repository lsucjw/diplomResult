import {
  SourceType,
  MapperBase,
} from '../../../../utils/mapper/mapper-base.util';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { User } from '../domains/user.domain';
import { Role } from '../role.enum';
import { GroupMapper } from './group.mapper';

export class CreateUserRequestMapper extends MapperBase<
  CreateUserRequestDto,
  User
> {
  constructor() {
    super(CreateUserRequestDto, User);
  }

  protected transformDtoToDomain(dto: CreateUserRequestDto): User {
    return this.plainToDomain({
      id: 0,
      role: Role[dto.role],
      group: GroupMapper.to().domain(
        {
          id: dto.groupId,
          name: '',
        },
        SourceType.Dto,
      ),
    });
  }
}
