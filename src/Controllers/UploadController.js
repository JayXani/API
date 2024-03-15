/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Picture from '../models/Picture';

const upload = multer(multerConfig).single('picture');

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
        const picture = await Picture.create({ filename, originalname, pic_student_id });
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

export default new UploadController();
