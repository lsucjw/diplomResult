import { join } from 'node:path';
import { ScheduleParserHelper } from '../helpers/schedule-parser.helper';
import * as process from 'node:process';

describe('...', () => {
  beforeEach(async () => {});

  it('...', async () => {
    const sheduleParser = new ScheduleParserHelper(
      join(process.cwd(), 'schedule', 'ИСиТ.xlsx'),
    );

    sheduleParser.read();
  });
});

/* Группа
Номер
Курс

Дни
*/

/* День
Тип - понедельник...
Пары
*/

/* Пара
Номер
Название
Преподаватель
Подгруппа
Числитель-знаменатель
*/
