import { ScheduleUploadService } from './contracts/schedule-upload.service.contract';
import { join } from 'node:path';
import * as process from 'node:process';
import * as fs from 'node:fs/promises';

export class ScheduleUploadServiceImpl extends ScheduleUploadService {
  private fileName = 'schedule.xlsx';
  private folderPath = join(process.cwd(), 'schedule');
  private filePath = join(this.folderPath, this.fileName);

  async upload(fileBuffer: Buffer): Promise<string> {
    await this.recreateFolder();

    await fs.writeFile(this.filePath, fileBuffer);

    return this.filePath;
  }

  private async recreateFolder() {
    await fs.mkdir(this.folderPath, { recursive: true });

    try {
      await fs.access(this.filePath);
      await fs.unlink(this.filePath);
    } catch {
      console.log(`Файл не найден: ${this.filePath}`);
    }
  }
}
