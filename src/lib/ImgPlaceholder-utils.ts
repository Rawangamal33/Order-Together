export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.replace(/[^\p{L}]/gu, ''))
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};
