import {
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Calendar,
  Flag,
} from "lucide-react";

export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const getPriorityLabel = (priority) => {
    const labels = {
      1: "Lowest",
      2: "Low",
      3: "Medium",
      4: "High",
      5: "Highest",
    };
    return labels[priority] || "Medium";
  };

  const getPriorityClass = (priority) => {
    if (priority >= 4) return "priority-high";
    if (priority === 3) return "priority-medium";
    return "priority-low";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  };

  return (
    <div
      className="card rounded-lg p-4 transition-colors"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: task.color || "var(--task-gray)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => onToggle(task)} className="mt-1 flex-shrink-0">
            {task.isComplete ? (
              <CheckCircle2 className="text-muted" size={20} />
            ) : (
              <div className="w-5 h-5 border-2 border-secondary rounded-full hover:border-hover transition-colors" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h4
                className={`text-lg font-medium ${
                  task.isComplete ? "text-completed" : "text-secondary"
                }`}
              >
                {task.task}
              </h4>
              {task.priority && (
                <span
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  <Flag size={12} />
                  Priority {task.priority} - {getPriorityLabel(task.priority)}
                </span>
              )}
            </div>

            {task.description && (
              <p className="text-tertiary text-sm mt-1">{task.description}</p>
            )}

            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>
                  {formatDate(task.createdAt) ||
                    new Date().toLocaleDateString()}
                </span>
              </div>

              {task.dueDate && (
                <div
                  className={`flex items-center gap-1 ${
                    isOverdue(task.dueDate) ? "text-overdue" : ""
                  }`}
                >
                  <Calendar size={14} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                  {isOverdue(task.dueDate) && (
                    <span className="font-semibold">(Overdue)</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-tertiary rounded transition-colors"
          >
            <Edit2 className="text-tertiary hover:text-secondary" size={18} />
          </button>
          <button
            onClick={() => onDelete(task.taskId)}
            className="p-2 hover:bg-tertiary rounded transition-colors"
          >
            <Trash2 className="text-tertiary hover:text-secondary" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
