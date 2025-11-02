const validationHelpers = {
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  validatePassword: (pwd) => pwd.length >= 6,
  validateTaskTitle: (title) => title.trim().length > 0 && title.length <= 100,
  validateRequired: (value) => value.trim().length > 0,
};

export { validationHelpers };
