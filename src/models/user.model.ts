import { z } from 'zod';

const id = z.string();

const firstName = z
  .string()
  .min(3, 'First name must have at least 3 characters')
  .max(30, 'First name must have until 30 characters');

const lastName = z
  .string()
  .min(3, 'Last name must have at least 3 characters')
  .max(30, 'Last name must have until 30 characters');

const username = z
  .string()
  .min(3, 'Username must have at least 3 characters')
  .max(20, 'Username must have until 20 characters');

const email = z
  .string()
  .max(60, 'Email must have until 60 characters')
  .email('Email must be a valid email');

const password = z
  .string()
  .min(6, 'Password must have at least 6 characters')
  .max(20, 'Password must have until 20 characters');

const createdAt = z.date();

const updatedAt = z.date();

const userSchema = z.object({
  id,
  firstName,
  lastName,
  username,
  email,
  password,
  createdAt,
  updatedAt,
});

type User = z.infer<typeof userSchema>;

export {
  firstName,
  lastName,
  username,
  email,
  password,
  createdAt,
  updatedAt,
  userSchema,
  User,
};
