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

export const restaurantNameSchema = z
  .string()
  .min(3, {
    message: 'Restaurant name must be at least 3 characters long.',
  })
  .max(50, { message: 'Restaurant name must not exceed 50 characters.' })
  .regex(/^[\p{L}0-9\s&\-\.'\/() +]+$/u, {
    message:
      "Name contains invalid characters. Allowed: Arabic/English letters, numbers, and & - . ' / ( ) +",
  })
  .refine((val) => val.trim().length > 0, {
    message: 'Restaurant name cannot be empty or whitespace only.',
  });

export const logoUrlSchema = z.string().url().optional();

export const menuNameSchema = z
  .string()
  .min(2, { message: 'Name must be between 2 and 40 characters.' })
  .max(40, { message: 'Name must be between 2 and 40 characters.' })
  .regex(/^[\p{L}0-9\s\-.'()]+$/u, {
    message:
      "Name contains invalid characters. Allowed: Arabic/English letters, numbers, spaces, and - . ' ( )",
  });

export const descriptionMenuSchema = z
  .string()
  .max(500, { message: 'Description must not exceed 500 characters.' })
  .regex(/^[\p{L}0-9\s,.\-()'"!?:;/]*$/u, {
    message:
      'Description contains invalid characters. Allowed: Letters, numbers, and common punctuation.',
  })
  .optional();

export const priceMenuSchema = z
  .number()
  .positive({ message: 'Price must be greater than zero.' })
  .max(100_000_000, { message: 'Price must be less than 100,000,000' })
  .refine(
    (price) => {
      const decimalPlaces = (price.toString().split('.')[1] || '').length;
      return decimalPlaces <= 2;
    },
    {
      message: 'Price cannot have more than 2 decimal places (e.g., 10.99).',
    }
  );
