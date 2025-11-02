const taskHelpers = {
  filterTasks: (tasks, filter) => {
    if (filter === "completed") return tasks.filter((t) => t.isComplete);
    if (filter === "pending") return tasks.filter((t) => !t.isComplete);
    return tasks;
  },
  sortTasks: (tasks) => {
    return [...tasks].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  },
  getTaskStats: (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isComplete).length;
    const pending = total - completed;
    return { total, completed, pending };
  },
};

export { taskHelpers };
