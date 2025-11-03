/**
 * validationHelpers
 *
 * Small collection of synchronous validators used across the app for
 * simple client-side checks (email format, password length, required fields).
 */
const validationHelpers = {
  /**
   * Validate email using a simple regex that ensures presence of "@" and "."
   * and that there are no whitespace characters in the local or domain parts.
   *
   * @param {string} email - email string to validate
   * @returns {boolean} true when email looks valid
   */
  validateEmail: (email) =>
    // basic pattern: non-space chars + "@" + non-space chars + "." + non-space chars
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  /**
   * Validate password by checking minimum length.
   *
   * @param {string} pwd - password string
   * @returns {boolean} true when password meets minimum length requirement
   */
  validatePassword: (pwd) =>
    // require at least 6 characters
    pwd.length >= 6,

  /**
   * Validate task title is present (non-empty after trimming) and within length limits.
   *
   * @param {string} title - task title input
   * @returns {boolean} true when title is non-empty and <= 100 characters
   */
  validateTaskTitle: (title) =>
    // trim to ignore surrounding whitespace for the "required" check
    title.trim().length > 0 && title.length <= 100,

  /**
   * Generic required-field validator (non-empty after trimming).
   *
   * @param {string} value - input value to validate
   * @returns {boolean} true when value contains non-whitespace characters
   */
  validateRequired: (value) =>
    // uses trim to ensure strings like "   " are considered empty
    value.trim().length > 0,

  /*IDEA: Validation for date to be only in the future? */
};

export { validationHelpers };
