import { apiHelpers } from '../utils/apiHelpers';
import { API_ENDPOINTS } from '../utils/constants';

export class TaskService {
  static async getTasks(token) {
    return await apiHelpers.get(API_ENDPOINTS.TASKS, token);
  }

  static async getTask(id, token) {
    return await apiHelpers.get(API_ENDPOINTS.TASK(id), token);
  }

  static async createTask(taskData, token) {
    return await apiHelpers.post(API_ENDPOINTS.TASKS, {
      ...taskData,
      createdAt: new Date().toISOString(),
      completed: false
    }, token);
  }

  static async updateTask(id, taskData, token) {
    return await apiHelpers.put(API_ENDPOINTS.TASK(id), taskData, token);
  }

  static async deleteTask(id, token) {
    return await apiHelpers.delete(API_ENDPOINTS.TASK(id), token);
  }

  static async toggleTaskCompletion(task, token) {
    return await apiHelpers.put(
      API_ENDPOINTS.TASK(task.id),
      { ...task, completed: !task.completed },
      token
    );
  }
}

export default TaskService;