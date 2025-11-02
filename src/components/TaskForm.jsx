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
    { value: "#6b7280", label: "Gray" },
    { value: "#ef4444", label: "Red" },
    { value: "#f97316", label: "Orange" },
    { value: "#eab308", label: "Yellow" },
    { value: "#22c55e", label: "Green" },
    { value: "#3b82f6", label: "Blue" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#ec4899", label: "Pink" },
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
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 mb-6">
      <h3 className="text-xl font-semibold text-neutral-100 mb-4">
        {editTask ? "Edit Task" : "New Task"}
      </h3>

      {error && (
        <div className="bg-neutral-700 border border-neutral-600 text-neutral-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-neutral-400 text-sm mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-700 text-neutral-100 border border-neutral-600 rounded px-4 py-2.5 focus:outline-none focus:border-neutral-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-neutral-400 text-sm mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-neutral-700 text-neutral-100 border border-neutral-600 rounded px-4 py-2.5 focus:outline-none focus:border-neutral-500 min-h-24 resize-none"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-400 text-sm mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-neutral-700 text-neutral-100 border border-neutral-600 rounded px-4 py-2.5 focus:outline-none focus:border-neutral-500"
            >
              <option value="1">1 - Lowest</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Highest</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-400 text-sm mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={
                dueDate instanceof Date
                  ? dueDate.toISOString().split("T")[0]
                  : dueDate
              }
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-neutral-700 text-neutral-100 border border-neutral-600 rounded px-4 py-2.5 focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-400 text-sm mb-2">Color</label>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => setColor(colorOption.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded border transition-colors ${
                  color === colorOption.value
                    ? "border-neutral-400 bg-neutral-700"
                    : "border-neutral-600 bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 border-neutral-900"
                  style={{ backgroundColor: colorOption.value }}
                />
                <span className="text-neutral-300 text-sm">
                  {colorOption.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-neutral-600 hover:bg-neutral-500 text-neutral-100 font-semibold py-2.5 rounded transition-colors"
          >
            {editTask ? "Update" : "Add Task"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold py-2.5 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
