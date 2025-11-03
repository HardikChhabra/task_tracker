import { ListTodo } from "lucide-react";
import TaskItem from "./TaskItem";

/**
 * TaskList component
 *
 * Renders a list of TaskItem components or a friendly empty state when there are no tasks.
 *
 * @param {Object} props
 * @param {Array<Object>} props.tasks - array of task objects to display
 * @param {(task: Object) => void} props.onToggle - called when a task's completed state is toggled
 * @param {(task: Object) => void} props.onEdit - called to begin editing a task
 * @param {(taskId: string|number) => void} props.onDelete - called to delete a task
 * @returns {JSX.Element}
 */
export const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  // show an empty state when there are no tasks to display
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        <ListTodo size={48} className="mx-auto mb-4 opacity-50" />
        <p>No tasks found. Add your first task to get started.</p>
      </div>
    );
  }

  // render each task using the TaskItem component and pass through action handlers
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.taskId}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
