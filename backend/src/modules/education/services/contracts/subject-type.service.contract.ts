import { SubjectType } from '../../models/domains/subject-type.domain';

export abstract class SubjectTypeService {
  abstract getAll(): Promise<SubjectType[]>;
  abstract addOrUpdate(subjectTypes: SubjectType[]): Promise<void>;
}
