const storageHelpers = {
  saveToken: (token) => {
    try {
      localStorage.setItem("authToken", token);
      return true;
    } catch (err) {
      console.error("Failed to save token:", err);
      return false;
    }
  },
  getToken: () => {
    try {
      return localStorage.getItem("authToken");
    } catch (err) {
      console.error("Failed to get token:", err);
      return null;
    }
  },
  removeToken: () => {
    try {
      localStorage.removeItem("authToken");
      return true;
    } catch (err) {
      console.error("Failed to remove token:", err);
      return false;
    }
  },
  saveUserName: (user) => {
    try {
      localStorage.setItem("userName", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Failed to save user data:", err);
      return false;
    }
  },
  getUserName: () => {
    try {
      const userData = localStorage.getItem("userName");
      return userData ? JSON.parse(userData) : null;
    } catch (err) {
      console.error("Failed to get user data:", err);
      return null;
    }
  },
  removeUserName: () => {
    try {
      localStorage.removeItem("userName");
      return true;
    } catch (err) {
      console.error("Failed to remove user data:", err);
      return false;
    }
  },
  clearStorage: () => {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error("Failed to clear storage:", err);
      return false;
    }
  },
};

export { storageHelpers };
