import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { User } from '../domains/user.domain';

export class CreateUserResponseMapper extends MapperBase {
  static toDto(domain: User): Promise<CreateUserResponseDto> {
    return this.adaptToDto(CreateUserResponseDto, {
      userId: domain.id,
    });
  }
}
