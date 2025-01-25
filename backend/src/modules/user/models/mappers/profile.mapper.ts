import { MapperBase } from '../../../../utils/mapper/mapper-base.util';
import { ProfileEntity } from '../entities/profile.entity';
import { Profile } from '../domains/profile.domain';
import { ProfileDto } from '../dtos/profile.dto';

export class ProfileMapper extends MapperBase {
  static entityToDomain(entity: ProfileEntity): Profile {
    return this.adaptToDomain(Profile, entity);
  }

  static dtoToDomain(dto: ProfileDto): Profile {
    return this.adaptToDomain(Profile, {
      firstName: dto.firstName,
      surName: dto.surName,
      middleName: dto.middleName,
    });
  }

  static toDto(domain: Profile): Promise<ProfileDto> {
    return this.adaptToDto(ProfileDto, {
      firstName: domain.firstName,
      surName: domain.surName,
      middleName: domain.middleName,
    });
  }

  static toEntity(domain: Profile): ProfileEntity {
    return this.adaptToEntity(ProfileEntity, {
      firstName: domain.firstName,
      surName: domain.surName,
      middleName: domain.middleName,
    });
  }
}
