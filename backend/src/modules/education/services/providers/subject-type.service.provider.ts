import { Provider } from '@nestjs/common';
import { SubjectTypeServiceImpl } from '../subject-type.service.impl';
import { SubjectTypeService } from '../contracts/subject-type.service.contract';

export const SubjectTypeProvider = {
  provide: SubjectTypeService,
  useClass: SubjectTypeServiceImpl,
} satisfies Provider;
