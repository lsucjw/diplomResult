import { XlsxReader } from '../utils/xlsx-reader.utils';

enum SubPageType {
  First,
  Second,
}

enum DayType {
  PN = 'ПН',
  VT = 'ВТ',
  SR = 'СР',
  CHT = 'ЧТ',
  PT = 'ПТ',
  SB = 'СБ',
}

interface ScheduleStart {
  Name: string;
  Number: string;
}

class CellPosition {
  static DivideSubPage = 'H';

  static FirstSubPage = {
    Number: 'E8',
    Course: 'E7',
    ScheduleStart: {
      Name: 'A',
      Number: 'B',
    },
    Schedule: {
      FirstSubgroupClass: 'C',
      SecondSubgroupClass: 'E',
      Professor: 'G',
    },
  };

  static SecondSubPage = {
    Number: 'L8',
    Course: 'L7',
    ScheduleStart: {
      Name: 'H',
      Number: 'I',
    },
    Schedule: {
      FirstSubgroupClass: 'J',
      SecondSubgroupClass: 'L',
      Professor: 'N',
    },
  };
}

interface SubPage {
  type: SubPageType;
  value: Map<string, Record<string, string | number>>;
}

type DayPosition = {
  start: number;
  end: number;
};

type NameParseResult = {
  name: string;
  room: string;
  parity: ParityType;
};

export class ScheduleParserHelper {
  constructor(private readonly scheduleFilePath: string) {}
  public read() {
    const rawXlsx = XlsxReader.read(this.scheduleFilePath);

    const subPages = this.getSubPages(rawXlsx);
    return this.transformToGroups(subPages);
  }

  private getSubPages(
    rawXlsx: Record<string, Map<string, Record<string, string | number>>>,
  ): SubPage[] {
    const result: SubPage[] = [];
    const pageNames = Object.keys(rawXlsx);

    for (const pageName of pageNames) {
      const pageValue = rawXlsx[pageName];

      const pageKeys = [...pageValue.keys()];
      const endFirstGroup = pageKeys.findIndex((x) =>
        x.includes(CellPosition.DivideSubPage),
      );

      const firstGroupKyes = pageKeys.slice(0, endFirstGroup);
      const secondGroupKyes = pageKeys.slice(endFirstGroup);

      result.push(
        this.fillSubPage(firstGroupKyes, pageValue, SubPageType.First),
        this.fillSubPage(secondGroupKyes, pageValue, SubPageType.Second),
      );
    }

    return result;
  }

  private fillSubPage(
    groupKeys: string[],
    pageValue: Map<string, Record<string, string | number>>,
    type: SubPageType,
  ): SubPage {
    const value = new Map(groupKeys.map((x) => [x, pageValue.get(x)]));
    return { type, value };
  }

  private transformToGroups(subPages: SubPage[]): GroupParser[] {
    return subPages.map((x) => {
      const group = new GroupParser();

      const [course, number] = this.getCourseAndNumber(x);
      group.course = course;
      group.number = number;

      group.days = this.getDays(x);
      return group;
    });
  }

  private getCourseAndNumber(
    subPages: SubPage,
  ): [course: number, number: string] {
    const cellPosition =
      subPages.type === SubPageType.First
        ? CellPosition.FirstSubPage
        : CellPosition.SecondSubPage;
    return [
      subPages.value.get(cellPosition.Course).v as number,
      subPages.value.get(cellPosition.Number).v as string,
    ];
  }

  private getDays(subPage: SubPage): Day[] {
    const sheduleStart =
      subPage.type === SubPageType.First
        ? CellPosition.FirstSubPage.ScheduleStart
        : CellPosition.SecondSubPage.ScheduleStart;

    const dayCells = this.getDayCellIndexes(subPage, sheduleStart);

    const lastScheduleCell = this.getLastScheduleCellIndex(
      subPage,
      sheduleStart,
    );

    return dayCells.map((day, index) => {
      const isLastDay = index === dayCells.length - 1;
      const positions: DayPosition = {
        start: day.key,
        end: isLastDay ? lastScheduleCell + 1 : dayCells[index + 1].key,
      };

      const classes = this.getClasses(positions, subPage);
      return new Day(day.value, classes);
    });
  }

  private getDayCellIndexes(
    subPage: SubPage,
    scheduleStart: ScheduleStart,
  ): { key: number; value: string }[] {
    const dayTypesKeys = Object.values(DayType) as string[];

    const keys = [...subPage.value.keys()].filter((x) =>
      x.includes(scheduleStart.Name),
    );
    const values = keys
      .map((x) => ({
        key: x,
        value: subPage.value.get(x).v as string,
      }))
      .filter((x) => dayTypesKeys.includes(x.value));

    return values.map((x) => ({
      key: parseInt(x.key.slice(1), 10),
      value: x.value,
    }));
  }

  private getLastScheduleCellIndex(
    subPage: SubPage,
    scheduleStart: ScheduleStart,
  ): number {
    const keys = [...subPage.value.keys()].filter((x) =>
      x.includes(scheduleStart.Number),
    );

    const values = keys
      .map((x) => ({
        key: x,
        value: subPage.value.get(x).v as number,
      }))
      .filter((x) => Number.isInteger(x.value))
      .map((x) => x.key)
      .sort(XlsxReader.comporator);

    const lastKey = values[values.length - 1];
    return parseInt(lastKey.slice(1), 10);
  }

  private getClasses(positions: DayPosition, subPage: SubPage): Class[] {
    const cells = subPage.value;
    const cellsConstant =
      subPage.type === SubPageType.First
        ? CellPosition.FirstSubPage
        : CellPosition.SecondSubPage;

    const result: Class[] = [];
    for (let i = positions.start; i < positions.end; i++) {
      const number = cells.get(`${cellsConstant.ScheduleStart.Number}${i}`)
        ?.v as number | undefined;

      const classInfo = cells.get(
        `${cellsConstant.Schedule.FirstSubgroupClass}${i}`,
      )?.v as string | undefined;

      if (!classInfo || !number) {
        continue;
      }

      const subGroupClassInfo = cells.get(
        `${cellsConstant.Schedule.SecondSubgroupClass}${i}`,
      )?.v as string | undefined;
      const subGroupIsExist = subGroupClassInfo !== undefined;

      const [professorFirst, professorSecond] = this.computeProfessorsInfo(
        cells,
        cellsConstant.Schedule.Professor,
        i,
      );

      if (subGroupIsExist) {
        const [first, second] = this.computeInfoFromName(subGroupClassInfo);
        result.push(
          new Class({
            number,
            professor: professorSecond ? professorSecond[0] : undefined,
            subGroup: SubGroupType.Second,
            parity: first.parity,
            room: first.room,
            name: first.name,
          }),
        );

        if (second) {
          result.push(
            new Class({
              number,
              professor: professorSecond ? professorSecond[1] : undefined,
              subGroup: SubGroupType.Second,
              parity: second.parity,
              room: second.room,
              name: second.name,
            }),
          );
        }
        return result;
      }

      const [first, second] = this.computeInfoFromName(classInfo);
      result.push(
        new Class({
          number,
          professor: professorFirst ? professorFirst[0] : undefined,
          subGroup: subGroupIsExist ? SubGroupType.First : SubGroupType.General,
          parity: first.parity,
          room: first.room,
          name: first.name,
        }),
      );

      if (second) {
        result.push(
          new Class({
            number,
            professor: professorFirst ? professorFirst[1] : undefined,
            subGroup: subGroupIsExist
              ? SubGroupType.First
              : SubGroupType.General,
            parity: second.parity,
            room: second.room,
            name: second.name,
          }),
        );
      }
    }

    return result;
  }

  private computeProfessorsInfo(
    cells: Map<string, Record<string, string | number>>,
    professorColumnName: string,
    index: number,
  ): string[][] {
    const professorInfoRaw = cells.get(`${professorColumnName}${index}`)?.v as
      | string
      | undefined;
    if (!professorInfoRaw) {
      return [];
    }

    const professorSubGroupsParse = professorInfoRaw
      .split(';')
      .map((x) => x.trim());

    return professorSubGroupsParse.map((x) =>
      x.split('/').map((x) => x.trim()),
    );
  }

  private computeInfoFromName(originalName: string): NameParseResult[] {
    if (!originalName.includes('//')) {
      const parsed = this.parseName(originalName);

      return [
        {
          name: parsed[0],
          room: parsed.length > 2 ? parsed[2] : parsed[1],
          parity: ParityType.General,
        },
      ];
    }

    const parsedOriginalNames = originalName.split('//');
    if (parsedOriginalNames.length > 1) {
      const [first, second] = parsedOriginalNames.map((name) =>
        this.parseName(name),
      );

      const result = [];

      if (first[0] !== '') {
        result.push({
          name: first[0],
          room: first.length > 2 ? first[2] : first[1],
          parity: ParityType.Numerator,
        });
      }

      if (second[0] !== '') {
        result.push({
          name: second[0],
          room: second.length > 2 ? second[2] : second[1],
          parity: ParityType.Numerator,
        });
      }

      return result;
    }

    const [name, room] = this.parseName(parsedOriginalNames[0]);
    return [
      {
        name,
        room,
        parity: parsedOriginalNames[0].startsWith('//')
          ? ParityType.Denominator
          : ParityType.Numerator,
      },
    ];
  }

  private parseName(original: string): string[] {
    return original.split(',').map((x) => x.trim());
  }
}

export class GroupParser {
  number: string;
  course: number;

  days: Day[];
}

class Day {
  constructor(
    public type: string,
    public classes: Class[],
  ) {}
}

export class Class {
  constructor(value: Class) {
    this.number = value.number;
    this.name = value.name;
    this.subGroup = value.subGroup;
    this.room = value.room;
    this.parity = value.parity;
    this.professor = value.professor;
  }

  number: number;
  name: string;
  professor: string;
  room: string;
  subGroup: SubGroupType;
  parity: ParityType;
}

enum SubGroupType {
  First,
  Second,
  General,
}

enum ParityType {
  Numerator,
  Denominator,
  General,
}
