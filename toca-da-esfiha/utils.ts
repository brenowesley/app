export const createPageUrl = (pageName: string): string => {
  if (pageName === 'Menu') return '/';
  return `/${pageName.toLowerCase()}`;
};