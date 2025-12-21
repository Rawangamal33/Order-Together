import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date | string | number): string {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-US', {
    month: 'short', // Oct
    year: 'numeric', // 2024
  });
}
