export const isEmailValid = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordStrong = (password: string): boolean =>
  password.length >= 6;