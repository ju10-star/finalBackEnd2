import jwt from 'jsonwebtoken';
import { usersRepository } from '../repositories/users.repository.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { config } from '../config/config.js';
import UserCurrentDTO from '../dto/user-current.dto.js';
import { customError } from '../utils/errors/customError.js';

class SessionsService {
  async register(userData) {
    const { first_name, last_name, email, age, password } = userData;

    if (!first_name || !last_name || !email || !password) {
      throw new Error('Faltan datos obligatorios');
    }

    const existingUser = await usersRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      role: 'user'
    };

    return await usersRepository.createUser(newUser);
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email y password son obligatorios');
    }

    const user = await usersRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!isValidPassword(user, password)) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      config.jwt.secret,
      { expiresIn: '1h' }
    );

    return token;
  }

  async getCurrentUser(user) {
    if (!user) {
      throw new customError(
        'Usuario no autenticado',
        401
      );
    }
    return new UserCurrentDTO(user);
  }
}

export const sessionsService = new SessionsService();