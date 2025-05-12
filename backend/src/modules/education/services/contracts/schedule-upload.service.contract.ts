export abstract class ScheduleUploadService {
  abstract upload(fileBuffer: Buffer): Promise<string>;
}
