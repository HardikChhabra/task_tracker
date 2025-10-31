const validationHelpers = {
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  validatePassword: (pwd) => pwd.length >= 6,
  validateTaskTitle: (title) => title.trim().length > 0,
};

export default validationHelpers;
