const taskHelpers = {
  filterTasks: (tasks, filter) => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  },
  sortTasks: (tasks) => {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
};

export default taskHelpers;
