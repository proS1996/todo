import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/get-user', authenticate, getMe);


export default router;
