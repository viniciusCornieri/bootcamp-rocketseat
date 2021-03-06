import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.config.disk.uploadsFolder, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.config.disk.uploadsFolder, file);

    if (this.fileExists(filePath)) {
      try {
        await fs.promises.unlink(filePath);
      } catch {
        /* ignore unlink error */
      }
    }
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.stat(filePath);
    } catch {
      return false;
    }

    return true;
  }
}

export default DiskStorageProvider;
