import { sessionsService } from '../services/sessions.service.js';

class SessionsController {
  async register(req, res, next) {
    try {
      const user = await sessionsService.register(req.body);

      res.status(201).json({
        status: 'success',
        payload: user
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const token = await sessionsService.login(email, password);

      res.cookie('jwtCookie', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      });

      res.status(200).json({
        status: 'success',
        message: 'Login successful'
      });
    } catch (error) {
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      const safeUser = await sessionsService.getCurrentUser(req.user);

      res.status(200).json({
        status: 'success',
        payload: safeUser
      });
    } catch (error) {
      next(error);
    }
  }
}

export const sessionsController = new SessionsController();