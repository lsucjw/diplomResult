import { ScheduleUpdateService } from './contracts/schedule-update.service.contract';
import {
  Class,
  GroupParser,
  ScheduleParserHelper,
} from '../helpers/schedule-parser.helper';
import { GroupService } from '../../user/services/contracts/group.service.contract';
import { Injectable } from '@nestjs/common';
import { InjectMapper, MapperInterface } from '@mappers/nest';
import { Group } from '../../user/models/domains/group.domain';
import { SubjectTypeService } from './contracts/subject-type.service.contract';
import { SubjectType } from '../models/domains/subject-type.domain';
import { UserService } from '../../user/services/contracts/user.service.contract';
import { HasherUtil } from '../../../utils/hasher/hasher.util';

@Injectable()
export class ScheduleUpdateServiceImpl extends ScheduleUpdateService {
  constructor(
    @InjectMapper()
    private readonly mapper: MapperInterface,
    private groupService: GroupService,
    private subjectTypeService: SubjectTypeService,
    private userService: UserService,
  ) {
    super();
  }

  async update(filePath: string): Promise<void> {
    const parser = new ScheduleParserHelper(filePath);
    const parsed = parser.read();

    const classes = this.getClasses(parsed);

    await Promise.all([
      //this.updateGroups(parsed),
      //this.updateSubjectTypes(classes),
      this.updateProfessors(classes),
    ]);
  }

  private async updateGroups(groups: GroupParser[]) {
    await this.groupService.addOrUpdate(
      await this.mapper.autoMap(groups, Group),
    );
  }

  private async updateSubjectTypes(classes: Class[]) {
    const subjectTypesSet = new Set(classes.map((x) => x.name));
    const subjectTypes = [...subjectTypesSet.entries()].map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, name]) => new SubjectType(name),
    );

    await this.subjectTypeService.addOrUpdate(subjectTypes);
  }

  private async updateProfessors(classes: Class[]) {
    const professorNames = classes
      .map((x) => x.professor)
      .filter((x) => x !== undefined);

    const professors = new Map<
      number,
      {
        firstName: string;
        middleName?: string;
        surName: string;
      }
    >();

    for (const name of professorNames) {
      if (name.includes(';')) {
        const names = name
          .split(';')
          .map((x) => x.trim())
          .filter((x) => x !== '');

        const first = this.divideName(names[0]);
        professors.set(
          HasherUtil.fromString(
            `${first.firstName}${first.middleName}${first.surName}`,
          ),
          first,
        );

        const second = this.divideName(names[1]);
        professors.set(
          HasherUtil.fromString(
            `${second.firstName}${second.middleName}${second.surName}`,
          ),
          second,
        );
        continue;
      }

      const dividedName = this.divideName(name);
      professors.set(
        HasherUtil.fromString(
          `${dividedName.firstName}${dividedName.middleName}${dividedName.surName}`,
        ),
        dividedName,
      );
    }

    await this.userService.addManyByNames([...professors.values()]);
  }

  private divideName(name: string) {
    const trimName = name.trim();

    if (!trimName.includes(' ')) {
      const [surName, firstName, middleName] = trimName
        .split('.')
        .filter((x) => x !== '');

      return {
        firstName: firstName.trim(),
        middleName: middleName?.trim(),
        surName: surName.trim(),
      };
    }

    const splitNames = trimName.split(' ').filter((x) => x !== '');

    const [firstName, middleName] = splitNames[1]
      .split('.')
      .filter((x) => x !== '');

    return {
      firstName: firstName.trim(),
      middleName: middleName?.trim(),
      surName: splitNames[0],
    };
  }

  private getClasses(parsed: GroupParser[]) {
    const classesInner = parsed.map((group) =>
      group.days.map((day) => day.classes),
    );
    return classesInner.flatMap((x) => x.flatMap((x) => x));
  }
}
