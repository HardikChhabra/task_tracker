import { apiHelpers } from "../utils/apiHelpers";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * TaskService
 *
 * Thin wrapper around apiHelpers to provide task-related CRUD operations.
 * Each method forwards the correct endpoint and payload to the centralized
 * apiHelpers so callers don't need to know endpoint details.
 */
export class TaskService {
  /**
   * Fetch all tasks.
   *
   * @param {string} token - authentication token for the request
   * @returns {Promise<Array>} array of task objects
   */
  static async getTasks(token) {
    // Delegate to api helper GET for the tasks collection
    return await apiHelpers.get(API_ENDPOINTS.TASKS, token);
  }

  /**
   * Fetch a single task by id.
   *
   * @param {string|number} id - task identifier
   * @param {string} token - authentication token
   * @returns {Promise<Object>} task object
   */
  static async getTask(id, token) {
    // Use endpoint builder for a specific task resource
    return await apiHelpers.get(API_ENDPOINTS.TASK(id), token);
  }

  /**
   * Create a new task on the server.
   *
   * Adds default properties required by the backend (e.g. isComplete=false)
   * before forwarding to the API helper.
   *
   * @param {Object} taskData - payload for the new task
   * @param {string} token - authentication token
   * @returns {Promise<Object>} newly created task
   */
  static async createTask(taskData, token) {
    // merge default isComplete flag into provided data and POST to collection
    return await apiHelpers.post(
      API_ENDPOINTS.TASKS,
      {
        ...taskData,
        isComplete: false,
      },
      token
    );
  }

  /**
   * Update an existing task.
   *
   * @param {string|number} id - task identifier
   * @param {Object} taskData - fields to update on the task
   * @param {string} token - authentication token
   * @returns {Promise<Object>} updated task
   */
  static async updateTask(id, taskData, token) {
    // PUT the updated task payload to the task resource
    return await apiHelpers.put(API_ENDPOINTS.TASK(id), taskData, token);
  }

  /**
   * Delete a task by id.
   *
   * @param {string|number} id - task identifier
   * @param {string} token - authentication token
   * @returns {Promise<void>}
   */
  static async deleteTask(id, token) {
    // call DELETE on the task resource
    return await apiHelpers.delete(API_ENDPOINTS.TASK(id), token);
  }

  /**
   * Toggle the completion state of a task.
   *
   * Sends an updated task payload with isComplete flipped and returns
   * the updated task from the server.
   *
   * @param {Object} task - current task object
   * @param {string} token - authentication token
   * @returns {Promise<Object>} updated task
   */
  static async toggleTaskCompletion(task, token) {
    // invert isComplete and PUT update to the task resource
    return await apiHelpers.put(
      API_ENDPOINTS.TASK(task.taskId),
      { ...task, isComplete: !task.isComplete },
      token
    );
  }
}

export default TaskService;
