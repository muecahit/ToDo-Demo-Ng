export const URLStringToString = (urlString: string): string => {
  return urlString.replace('_', ' ');
};

export const StringToURLString = (string: string): string => {
  return string.replace(' ', '_');
};
