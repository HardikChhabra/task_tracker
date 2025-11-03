/**
 * Module providing API URL and endpoint builders used across the app.
 * Keeps endpoint strings centralized so other modules don't hardcode URLs.
 */

// Base URL for the backend API (change here when switching environments)
const API_URL = "https://todo-api-b6d2.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    // login endpoint
    LOGIN: `${API_URL}/auth/login`,
    // signup / register endpoint
    SIGNUP: `${API_URL}/auth/register`,
  },
  // collection endpoint for tasks
  TASKS: `${API_URL}/task`,

  /**
   * Build URL for a specific task resource.
   *
   * @function
   * @param {string|number} id - identifier of the task
   * @returns {string} full URL for the task resource
   */
  TASK: (id) => `${API_URL}/task/${id}`,
};
