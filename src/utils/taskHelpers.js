const taskHelpers = {
  filterTasks: (tasks, filter) => {
    if (filter === "completed") return tasks.filter((t) => t.isComplete);
    if (filter === "pending") return tasks.filter((t) => !t.isComplete);
    if (filter === "overDue")
      return tasks.filter((t) => new Date(t.dueDate) < new Date());
    return tasks;
  },
  sortTasks: (tasks, sortBy) => {
    if (sortBy === "createdDesc") {
      return [...tasks].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortBy === "createdAsc") {
      return [...tasks].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (sortBy === "dueDateAsc") {
      return [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    } else if (sortBy === "dueDateDesc") {
      return [...tasks].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
    } else if (sortBy === "priorityDesc") {
      return [...tasks].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "priorityAsc") {
      return [...tasks].sort((a, b) => a.priority - b.priority);
    }
    return tasks;
  },
  getTaskStats: (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isComplete).length;
    const pending = total - completed;
    return { total, completed, pending };
  },
};

export { taskHelpers };
