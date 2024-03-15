/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// The routes under never must used
// router.get('/list', userController.index);
// router.get('/show', loginRequired, userController.show);
router.post('/store', userController.store);
router.put('/update', loginRequired, userController.update);
router.delete('/delete', loginRequired, userController.delete);

export default router;
