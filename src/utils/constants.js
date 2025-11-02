const API_URL = process.env.REACT_APP_API_BASE_URL;
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    SIGNUP: `${API_URL}/auth/register`,
  },
  TASKS: `${API_URL}/task`,
  TASK: (id) => `${API_URL}/task/${id}`,
};
