import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.get('/show/:id', studentController.show);
router.get('/index', studentController.index);
router.post('/create', loginRequired, studentController.store); // If user send the token, he can create a new student
router.put('/update/:id', loginRequired, studentController.update);
router.delete('/delete/:id', loginRequired, studentController.delete);
export default router;
