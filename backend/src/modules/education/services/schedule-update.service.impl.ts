import { ScheduleUpdateService } from './contracts/schedule-update.service.contract';
import {
  GroupParser,
  ScheduleParserHelper,
} from '../helpers/schedule-parser.helper';

export class ScheduleUpdateServiceImpl extends ScheduleUpdateService {
  async update(filePath: string): Promise<void> {
    const parser = new ScheduleParserHelper(filePath);
    const parsed = parser.read();

    await Promise.all([this.updateGroups(parsed)]);
  }

  private async updateGroups(groups: GroupParser[]) {
    // TODO Тут пересоздаем группы и дальше по остальным сущностям
    console.log(groups);
  }
}
