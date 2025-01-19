import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { User } from '../domains/user.domain';

export class CreateUserResponseMapper extends MapperBase<
  CreateUserResponseDto,
  User
> {
  constructor() {
    super(CreateUserResponseDto, User);
  }

  protected toDto(domain: User): Promise<CreateUserResponseDto> {
    return this.plainToDto({
      userId: domain.id,
    });
  }
}
