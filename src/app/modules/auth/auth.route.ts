import express from 'express';
import { hashPassword } from '../../middlewares/passHash';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/google-signin', AuthController.googleSignIn);

router.post('/signup',
    hashPassword,
    AuthController.signUp);

router.post('/login', AuthController.login);




export const AuthRoutes = router; // 