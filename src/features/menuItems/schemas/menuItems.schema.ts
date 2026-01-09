import z from 'zod';

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
