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
};

export default storageHelpers;
