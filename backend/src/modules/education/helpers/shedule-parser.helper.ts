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

interface SheduleStart {
  Name: string;
  Next: string;
}

class CellPosition {
  static DivideSubPage = 'H';

  static FirstSubPage = {
    Number: 'E8',
    Course: 'E7',
    SheduleStart: {
      Name: 'A',
      Next: 'B',
    },
  };

  static SecondSubPage = {
    Number: 'L8',
    Course: 'L7',
    SheduleStart: {
      Name: 'H',
      Next: 'I',
    },
  };
}

interface SubPage {
  type: SubPageType;
  value: Map<string, Record<string, string | number>>;
}

export class SheduleParserHelper {
  constructor(private readonly sheduleFilePath: string) {}
  public read() {
    const rawXlsx = XlsxReader.read(this.sheduleFilePath);

    const subPages = this.getSubPages(rawXlsx);
    const groups = this.transformToGroups(subPages);
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

  private transformToGroups(subPages: SubPage[]): Group[] {
    return subPages.map((x) => {
      const group = new Group();

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
        ? CellPosition.FirstSubPage.SheduleStart
        : CellPosition.SecondSubPage.SheduleStart;

    const dayCells = this.getDayCellIndexes(subPage, sheduleStart);

    const getLastSheduleCell = this.getLastSheduleCellIndex(
      subPage,
      sheduleStart,
    );

    return [];
  }

  private getDayCellIndexes(
    subPage: SubPage,
    sheduleStart: SheduleStart,
  ): { key: number; value: string }[] {
    const dayTypesKeys = Object.values(DayType) as string[];

    const keys = [...subPage.value.keys()].filter((x) =>
      x.includes(sheduleStart.Name),
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

  private getLastSheduleCellIndex(
    subPage: SubPage,
    sheduleStart: SheduleStart,
  ): number {
    const keys = [...subPage.value.keys()].filter((x) =>
      x.includes(sheduleStart.Next),
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
}

class Group {
  number: string;
  course: number;

  days: Day[];
}

class Day {
  type: string;
  classes: Class[];
}

class Class {
  number: number;
  name: string;
  professor: string;
}
