import { useState } from "react";
import { validationHelpers } from "../utils/validationHelpers";

/**
 * TaskForm component
 *
 * Renders a form for creating or editing a task. Validates the title,
 * prepares the payload and calls the appropriate callback (onAdd/onUpdate).
 *
 * @param {Object} props
 * @param {(taskData: Object) => void} props.onAdd - called with new task data
 * @param {() => void} props.onCancel - called when user cancels the form
 * @param {Object|null} props.editTask - existing task when editing, otherwise null
 * @param {(updatedTask: Object) => void} props.onUpdate - called with updated task data
 * @returns {JSX.Element}
 */
export const TaskForm = ({ onAdd, onCancel, editTask, onUpdate }) => {
  // initialize controlled state using editTask values when present
  const [title, setTitle] = useState(editTask?.task || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [color, setColor] = useState(editTask?.color || "#6b7280");
  // dueDate stored as Date when editing, otherwise default to today
  const [dueDate, setDueDate] = useState(
    editTask ? new Date(editTask.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(editTask?.priority || 3);
  const [error, setError] = useState("");

  // predefined color options used to render color selection buttons
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

  /**
   * Handle submit for both add and update flows.
   *
   * Validates required fields, constructs the task payload and dispatches
   * either onUpdate (when editing) or onAdd (when creating).
   *
   * @returns {void}
   */
  const handleSubmit = () => {
    // clear any previous validation error
    setError("");

    // ensure the title is provided using shared validation helper
    if (!validationHelpers.validateTaskTitle(title)) {
      setError("Task title is required");
      return;
    }

    // build task payload; ensure dueDate is a Date object
    const taskData = {
      task: title,
      description,
      color,
      dueDate: new Date(dueDate),
      // store priority as string to match expected backend/shape
      priority: priority.toString(),
    };

    // if editing, merge changes into existing task and call update handler
    if (editTask) {
      onUpdate({ ...editTask, ...taskData });
    } else {
      // otherwise, call add handler with new task data
      console.log(taskData);
      onAdd(taskData);
    }
  };

  return (
    <div className="card rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-primary mb-4">
        {editTask ? "Edit Task" : "New Task"}
      </h3>

      {/* show validation error when present */}
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
            onChange={(e) => setTitle(e.target.value)} // update controlled title
            className="w-full input-field rounded px-4 py-2.5"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block label text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // update description
            className="w-full input-field rounded px-4 py-2.5 min-h-24 resize-none"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block label text-sm mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // update priority (keeps numeric-like string)
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
              // convert Date to yyyy-mm-dd when dueDate is a Date instance
              value={
                dueDate instanceof Date
                  ? dueDate.toISOString().split("T")[0]
                  : dueDate
              }
              onChange={(e) => setDueDate(e.target.value)} // store string from input; converted later on submit
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
                onClick={() => setColor(colorOption.value)} // pick color for task
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
            onClick={handleSubmit} // submit handler for add/update
            className="flex-1 btn-primary font-semibold py-2.5 rounded transition-colors"
          >
            {editTask ? "Update" : "Add Task"}
          </button>
          <button
            onClick={onCancel} // cancel action provided by parent
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
