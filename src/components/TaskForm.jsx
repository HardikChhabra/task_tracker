import { useState } from "react";
import { validationHelpers } from "../utils/validationHelpers";

export const TaskForm = ({ onAdd, onCancel, editTask, onUpdate }) => {
  const [title, setTitle] = useState(editTask?.task || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [color, setColor] = useState(editTask?.color || "#6b7280");
  const [dueDate, setDueDate] = useState(
    editTask ? new Date(editTask.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(editTask?.priority || 3);
  const [error, setError] = useState("");

  const colorOptions = [
    { value: "#6b7280", label: "Gray", class: "task-color-gray" },
    { value: "#ef4444", label: "Red", class: "task-color-red" },
    { value: "#f97316", label: "Orange", class: "task-color-orange" },
    { value: "#eab308", label: "Yellow", class: "task-color-yellow" },
    { value: "#22c55e", label: "Green", class: "task-color-green" },
    { value: "#3b82f6", label: "Blue", class: "task-color-blue" },
    { value: "#8b5cf6", label: "Purple", class: "task-color-purple" },
    { value: "#ec4899", label: "Pink", class: "task-color-pink" },
  ];

  const handleSubmit = () => {
    setError("");

    if (!validationHelpers.validateTaskTitle(title)) {
      setError("Task title is required");
      return;
    }

    const taskData = {
      task: title,
      description,
      color,
      dueDate: new Date(dueDate),
      priority: priority.toString(),
    };

    if (editTask) {
      onUpdate({ ...editTask, ...taskData });
    } else {
      console.log(taskData);
      onAdd(taskData);
    }
  };
  return (
    <div className="card rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-primary mb-4">
        {editTask ? "Edit Task" : "New Task"}
      </h3>

      {error && (
        <div className="bg-tertiary border-secondary text-tertiary px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block label text-sm mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full input-field rounded px-4 py-2.5"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block label text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full input-field rounded px-4 py-2.5 min-h-24 resize-none"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block label text-sm mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full input-field rounded px-4 py-2.5"
            >
              <option value="1">1 - Lowest</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Highest</option>
            </select>
          </div>

          <div>
            <label className="block label text-sm mb-2">Due Date</label>
            <input
              type="date"
              value={
                dueDate instanceof Date
                  ? dueDate.toISOString().split("T")[0]
                  : dueDate
              }
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full input-field rounded px-4 py-2.5"
            />
          </div>
        </div>

        <div>
          <label className="block label text-sm mb-2">Color</label>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => setColor(colorOption.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded border transition-colors ${
                  color === colorOption.value
                    ? "border-secondary bg-tertiary"
                    : "border-primary bg-secondary hover:bg-tertiary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 ${colorOption.class}`}
                  style={{ borderColor: "var(--bg-primary)" }}
                />
                <span className="text-tertiary text-sm">
                  {colorOption.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 btn-primary font-semibold py-2.5 rounded transition-colors"
          >
            {editTask ? "Update" : "Add Task"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 btn-secondary font-semibold py-2.5 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
