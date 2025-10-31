import { ListTodo } from 'lucide-react';
import TaskItem from './TaskItem';

export const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        <ListTodo size={48} className="mx-auto mb-4 opacity-50" />
        <p>No tasks found. Add your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
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