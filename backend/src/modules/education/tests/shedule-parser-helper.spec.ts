import { join } from 'node:path';
import { SheduleParserHelper } from '../helpers/shedule-parser.helper';
import * as process from 'node:process';

describe('...', () => {
  beforeEach(async () => {});

  it('...', async () => {
    const sheduleParser = new SheduleParserHelper(
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
