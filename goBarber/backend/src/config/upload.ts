import multer, { StorageEngine } from 'multer';
import path from 'path';
import hash from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {
      uploadsFolder: string;
    };
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_request, file, callback) {
        const fileHash = hash.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {
      uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    },
    aws: {
      bucket: 'app-gobarber',
    },
  },
} as IUploadConfig;
