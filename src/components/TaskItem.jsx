import {
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Calendar,
  Flag,
} from "lucide-react";

/**
 * TaskItem component
 *
 * Renders a single task card with controls to toggle complete, edit, and delete.
 *
 * @param {Object} props
 * @param {Object} props.task - task object to display
 * @param {(task: Object) => void} props.onToggle - called when task completion is toggled
 * @param {(task: Object) => void} props.onEdit - called to start editing the task
 * @param {(taskId: string|number) => void} props.onDelete - called to delete the task
 * @returns {JSX.Element}
 */
export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  /**
   * Map numeric priority to human-readable label.
   *
   * @param {number|string} priority
   * @returns {string}
   */
  const getPriorityLabel = (priority) => {
    // basic mapping for known priorities; default to "Medium"
    const labels = {
      1: "Lowest",
      2: "Low",
      3: "Medium",
      4: "High",
      5: "Highest",
    };
    return labels[priority] || "Medium";
  };

  /**
   * Return CSS class based on priority to style the label.
   *
   * @param {number|string} priority
   * @returns {string}
   */
  const getPriorityClass = (priority) => {
    // high priorities (4 and 5) are highlighted, 3 is medium, otherwise low
    if (priority >= 4) return "priority-high";
    if (priority === 3) return "priority-medium";
    return "priority-low";
  };

  /**
   * Format an ISO date string (or Date-parsable value) into a short readable string.
   *
   * @param {string|undefined|null} dateString
   * @returns {string|null} formatted date or null if not provided
   */
  const formatDate = (dateString) => {
    // guard for empty values
    if (!dateString) return null;
    const date = new Date(dateString);
    // use locale formatting for month/day/year
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /**
   * Determine if a due date is overdue relative to today.
   *
   * @param {string|undefined|null} dateString
   * @returns {boolean}
   */
  const isOverdue = (dateString) => {
    // no due date means not overdue
    if (!dateString) return false;
    const dueDate = new Date(dateString);

    // compare dates at midnight to ignore time-of-day differences
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // overdue if dueDate is before today and task is not completed
    return dueDate < today && !task.completed;
  };

  return (
    <div
      className="card rounded-lg p-4 transition-colors"
      style={{
        // use task color for visual accent on the card's left border
        borderLeftWidth: "4px",
        borderLeftColor: task.color || "var(--task-gray)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => onToggle(task)} className="mt-1 flex-shrink-0">
            {task.isComplete ? (
              // show filled check icon when complete
              <CheckCircle2 className="text-muted" size={20} />
            ) : (
              // otherwise show an empty circular checkbox placeholder
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
                  {/* show numeric priority and human label */}
                  Priority {task.priority} - {getPriorityLabel(task.priority)}
                </span>
              )}
            </div>

            {/* optional description */}
            {task.description && (
              <p className="text-tertiary text-sm mt-1">{task.description}</p>
            )}

            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {/* show created date or fallback to today's date */}
                <span>
                  {formatDate(task.createdAt) ||
                    new Date().toLocaleDateString()}
                </span>
              </div>

              {task.dueDate && (
                <div
                  className={`flex items-center gap-1 ${
                    // highlight overdue tasks visually
                    isOverdue(task.dueDate) ? "text-overdue" : ""
                  }`}
                >
                  <Calendar size={14} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                  {isOverdue(task.dueDate) && (
                    // show explicit overdue indicator
                    <span className="font-semibold">(Overdue)</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {/* edit and delete controls */}
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
