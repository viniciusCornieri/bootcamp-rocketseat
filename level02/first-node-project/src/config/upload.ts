import multer from 'multer';
import path from 'path';
import hash from 'crypto';

const tmpDirectory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpDirectory,

  storage: multer.diskStorage({
    destination: tmpDirectory,
    filename(request, file, callback) {
      const fileHash = hash.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
