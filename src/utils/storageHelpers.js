/**
 * storageHelpers
 *
 * Small wrapper around localStorage to centralize save/get/remove operations
 * and provide basic error handling so callers don't need to repeat try/catch.
 */
const storageHelpers = {
  /**
   * Save auth token to localStorage.
   *
   * @param {string} token - authentication token to persist
   * @returns {boolean} true when saved successfully, false on error
   */
  saveToken: (token) => {
    try {
      // persist token under "authToken" key
      localStorage.setItem("authToken", token);
      return true;
    } catch (err) {
      // log and return false when storage operations fail (e.g. quota or disabled)
      console.error("Failed to save token:", err);
      return false;
    }
  },

  /**
   * Retrieve auth token from localStorage.
   *
   * @returns {string|null} stored token or null if missing / on error
   */
  getToken: () => {
    try {
      // read token value (may be null if not set)
      return localStorage.getItem("authToken");
    } catch (err) {
      // return null when unable to access storage
      console.error("Failed to get token:", err);
      return null;
    }
  },

  /**
   * Remove auth token from localStorage.
   *
   * @returns {boolean} true when removed successfully, false on error
   */
  removeToken: () => {
    try {
      // remove the saved token
      localStorage.removeItem("authToken");
      return true;
    } catch (err) {
      // log and return false on failure
      console.error("Failed to remove token:", err);
      return false;
    }
  },

  /**
   * Save user information (name or object) to localStorage as JSON.
   *
   * @param {any} user - user data to persist (will be JSON.stringified)
   * @returns {boolean} true when saved successfully, false on error
   */
  saveUserName: (user) => {
    try {
      // stringify complex user data to store reliably
      localStorage.setItem("userName", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Failed to save user data:", err);
      return false;
    }
  },

  /**
   * Retrieve user information from localStorage and parse JSON.
   *
   * @returns {any|null} parsed user data or null if not present / on error
   */
  getUserName: () => {
    try {
      // read raw JSON string and parse; return null when missing
      const userData = localStorage.getItem("userName");
      return userData ? JSON.parse(userData) : null;
    } catch (err) {
      // handle malformed JSON or storage access errors
      console.error("Failed to get user data:", err);
      return null;
    }
  },

  /**
   * Remove stored user information.
   *
   * @returns {boolean} true when removed successfully, false on error
   */
  removeUserName: () => {
    try {
      // remove the stored user JSON
      localStorage.removeItem("userName");
      return true;
    } catch (err) {
      console.error("Failed to remove user data:", err);
      return false;
    }
  },

  /**
   * Clear all application data from localStorage.
   *
   * @returns {boolean} true when cleared successfully, false on error
   */
  clearStorage: () => {
    try {
      // clear entire localStorage (use with care)
      localStorage.clear();
      return true;
    } catch (err) {
      console.error("Failed to clear storage:", err);
      return false;
    }
  },
};

export { storageHelpers };
