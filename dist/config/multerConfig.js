"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const fileRandom = () => Math.floor(Math.random() * 10000 + 10000);
exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('File invalid, verify of extension the file.'));
    }
    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({ // Object of configuration
    destination: (req, file, cb) => { // cb = function of callback
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${fileRandom()}${_path.extname.call(void 0, file.originalname)}`.trim()); // Name of the file
      // Extname = take a extension of the file
    },
  }),
};
