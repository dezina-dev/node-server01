import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/new-access-token', userController.getNewAccessToken);

export default router;
