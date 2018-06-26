export const removeToken = () => {
  localStorage.removeItem('todo-token');
};

export const tokenIsValid = (decodedTokenObj: object): boolean => {
  return getMillisecondsUntilExpire(decodedTokenObj) > 0;
};

export const decodeToken = (token: string): object => {
  const encodedPayload = token.split('.')[1];
  const payloadString = atob(encodedPayload);
  return JSON.parse(payloadString);
};

export const getMillisecondsUntilExpire = (decodedTokenObj: object): number => {
  return (decodedTokenObj['exp'] * 1000) - Date.now();
};

export const setToken = (token: string) => {
  localStorage.setItem('todo-token', token);
};

export const getToken = (): string => {
  return localStorage.getItem('todo-token');
};

export const getEmail = (decodedTokenObj: object): string => {
  return decodedTokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
};
