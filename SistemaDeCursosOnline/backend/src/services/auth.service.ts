import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.schema';
import HttpError from '../utils/httpError';

const loginService = async (email: string, password: string) => {
  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      console.log('loginService: user not found for', email);
      return null;
    }
    const comparePassword = user.passwordHash;
    if (!comparePassword) {
      console.log('loginService: user has no passwordHash');
      return null;
    }
    const isValid = await bcryptjs.compare(password, comparePassword);
    if (!isValid) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('loginService error', error);
    throw new HttpError('Usuaio o contraseña no identificados', 200);
  }
};

export default loginService;
