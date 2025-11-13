
import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { upload } from '../config/multerConfig.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', upload.single('profilePicture'), signup);

export default router;