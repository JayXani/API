// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import { extname, resolve } from 'path';

const fileRandom = () => Math.floor(Math.random() * 10000 + 10000);
export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('File invalid, verify of extension the file.'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({ // Object of configuration
    destination: (req, file, cb) => { // cb = function of callback
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${fileRandom()}${extname(file.originalname)}`.trim()); // Name of the file
      // Extname = take a extension of the file
    },
  }),
};
