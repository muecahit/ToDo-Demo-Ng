export const URLToString = (urlString: string): string => {
  return urlString.replace('_', ' ');
};

export const StringToURL = (string: string): string => {
  return string.replace(' ', '_');
};
