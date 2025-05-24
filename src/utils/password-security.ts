import bcrypt from 'bcrypt';

import env from '@/config/env';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.auth.saltRounds);
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
