"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('picture');

class UploadController {
  store(req, res) {
    // eslint-disable-next-line consistent-return
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json(
          {
            errors: error.code,
          },
        );
      }
      try {
        const { filename, originalname } = req.file;
        const { pic_student_id } = req.body;
        const picture = await _Picture2.default.create({ filename, originalname, pic_student_id });
        return res.json(picture);
      } catch (e) {
        return res.status(400).json(
          {
            error: "Student does't exist or picture wasn't send",
          },
        );
      }
    });
  }
}

exports. default = new UploadController();
