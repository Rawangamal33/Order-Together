import z from 'zod';

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
