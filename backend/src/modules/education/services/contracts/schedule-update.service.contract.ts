export abstract class ScheduleUpdateService {
  abstract update(filePath: string): Promise<void>;
}
