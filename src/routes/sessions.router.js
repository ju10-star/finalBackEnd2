import { Router } from 'express';
import { sessionsController } from '../controllers/sessions.controller.js';
import { passportCall } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', sessionsController.register);
router.post('/login', sessionsController.login);
router.get('/current', passportCall('jwt'), sessionsController.current);

export default router;