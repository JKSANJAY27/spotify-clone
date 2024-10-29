import express from 'express';
import { googleAuth, validateToken } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.get("/google", googleAuth);
authRouter.get("/validate", validateToken);

export default authRouter;