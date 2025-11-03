const API_URL = "https://todo-api-b6d2.onrender.com";
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    SIGNUP: `${API_URL}/auth/register`,
  },
  TASKS: `${API_URL}/task`,
  TASK: (id) => `${API_URL}/task/${id}`,
};
