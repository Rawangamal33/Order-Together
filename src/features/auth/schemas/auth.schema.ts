import z from 'zod';

export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address.' });

export const userNameSchema = z
  .string()
  .refine((val) => !/^[_*!$\-]/.test(val), {
    message: 'Name cannot start with a special character (_ * ! $ -).',
  })
  .refine((val) => /^[A-Za-z\u0600-\u06FF]{2}/.test(val), {
    message: 'Name must start with at least two letters.',
  })
  .refine((val) => /^[A-Za-z\u0600-\u06FF\s\-]+$/.test(val), {
    message: 'Only letters, spaces, and hyphens are allowed.',
  })
  .refine((val) => !/\s$/.test(val), {
    message: 'Name cannot end with a space.',
  })
  .refine((val) => !/\s(?![A-Za-z\u0600-\u06FF])/.test(val), {
    message: 'Every space must be followed by a letter.',
  })
  .refine((val) => /[A-Za-z\u0600-\u06FF]$/.test(val), {
    message: 'Name must end with a letter.',
  })
  .refine((val) => val.replace(/\s|-/g, '').length >= 2, {
    message: 'Name must contain at least 2 letters.',
  });

export const passSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long.' })
  .regex(/(?=.*[a-z])/, {
    message: 'Password must contain a lowercase letter.',
  })
  .regex(/(?=.*[A-Z])/, {
    message: 'Password must contain an uppercase letter.',
  })
  .regex(/(?=.*\d)/, { message: 'Password must contain a number.' });
