import { CheckCircle2, Clock, Edit2, Trash2 } from "lucide-react";

export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700 hover:border-neutral-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => {
              return onToggle(task);
            }}
            className="mt-1 flex-shrink-0"
          >
            {task.isComplete ? (
              <CheckCircle2 className="text-neutral-500" size={20} />
            ) : (
              <div className="w-5 h-5 border-2 border-neutral-600 rounded-full hover:border-neutral-500 transition-colors" />
            )}
          </button>

          <div className="flex-1">
            <h4
              className={`text-lg font-medium ${
                task.isComplete
                  ? "text-neutral-500 line-through"
                  : "text-neutral-200"
              }`}
            >
              {task.task}
            </h4>
            {task.description && (
              <p className="text-neutral-400 text-sm mt-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
              <Clock size={14} />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-neutral-700 rounded transition-colors"
          >
            <Edit2
              className="text-neutral-400 hover:text-neutral-300"
              size={18}
            />
          </button>
          <button
            onClick={() => onDelete(task.taskId)}
            className="p-2 hover:bg-neutral-700 rounded transition-colors"
          >
            <Trash2
              className="text-neutral-400 hover:text-neutral-300"
              size={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
