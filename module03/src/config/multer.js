import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // here can be a CDN like s3
    filename: (request, file, callback) => {
      // randomize the file name
      crypto.randomBytes(16, (err, response) => {
        if (err) return callback(err);
        return callback(
          null,
          response.toString('hex') + extname(file.originalname) // we use only the file extension to avoid the user pass weird chars
        );
      });
    },
  }),
};
