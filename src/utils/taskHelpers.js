/**
 * taskHelpers
 *
 * Utilities for filtering, sorting and computing basic stats for task arrays.
 * Keeps small, reusable functions here so components/services don't duplicate logic.
 */
const taskHelpers = {
  /**
   * Filter tasks by provided filter key.
   *
   * @param {Array<Object>} tasks - list of task objects
   * @param {string} filter - one of 'all'|'completed'|'pending'|'overDue'
   * @returns {Array<Object>} filtered tasks
   */
  filterTasks: (tasks, filter) => {
    // return only completed tasks
    if (filter === "completed") return tasks.filter((t) => t.isComplete);
    // return only pending (not completed) tasks
    if (filter === "pending") return tasks.filter((t) => !t.isComplete);
    // return tasks whose dueDate is before now (guard against missing dueDate)
    if (filter === "overDue")
      return tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date());
    // default: no filtering, return original list
    return tasks;
  },

  /**
   * Sort tasks according to a sort key.
   *
   * @param {Array<Object>} tasks - array of task objects
   * @param {string} sortBy - 'createdDesc'|'createdAsc'|'dueDateAsc'|'dueDateDesc'|'priorityDesc'|'priorityAsc'
   * @returns {Array<Object>} sorted copy of tasks
   */
  sortTasks: (tasks, sortBy) => {
    // createdDesc: newest created first (uses created_at field)
    if (sortBy === "createdDesc") {
      return [...tasks].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortBy === "createdAsc") {
      // createdAsc: oldest created first
      return [...tasks].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (sortBy === "dueDateAsc") {
      // dueDateAsc: earliest due date first (tasks without dueDate may become NaN)
      return [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    } else if (sortBy === "dueDateDesc") {
      // dueDateDesc: latest due date first
      return [...tasks].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
    } else if (sortBy === "priorityDesc") {
      // priorityDesc: higher numeric priority first
      return [...tasks].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "priorityAsc") {
      // priorityAsc: lower numeric priority first
      return [...tasks].sort((a, b) => a.priority - b.priority);
    }
    // no recognized sort -> return original array
    return tasks;
  },

  /**
   * Compute simple aggregate statistics for tasks.
   *
   * @param {Array<Object>} tasks - array of task objects
   * @returns {{total:number, completed:number, pending:number}} basic counts
   */
  getTaskStats: (tasks) => {
    // total number of tasks
    const total = tasks.length;
    // completed tasks determined by isComplete flag
    const completed = tasks.filter((t) => t.isComplete).length;
    // pending is the remainder
    const pending = total - completed;
    return { total, completed, pending };
  },
};

export { taskHelpers };
