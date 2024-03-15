import { Router } from 'express';
import uploadController from '../controllers/UploadController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.post('/', loginRequired, uploadController.store); // picture = name the of picture sented

export default router;
