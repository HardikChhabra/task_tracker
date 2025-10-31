const API_BASE_URL = process.env.API_BASE_URL;
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  TASKS: `${API_BASE_URL}/tasks`,
  TASK: (id) => `${API_BASE_URL}/tasks/${id}`,
};
