import { useState, useEffect } from "react";
import { LayoutDashboard, LogOut, Plus } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { TaskService } from "../services/TaskService";
import { taskHelpers } from "../utils/taskHelpers";
import { storageHelpers } from "../utils/storageHelpers";

/**
 * Dashboard page component
 *
 * Shows summary statistics, task filters, task creation/editing form and the task list.
 *
 * @param {Object} props
 * @param {() => void} props.onLogout - callback invoked when user logs out
 * @returns {JSX.Element}
 */
export const Dashboard = ({ onLogout }) => {
  // read token and user from storage helpers for API calls / display
  const token = storageHelpers.getToken();
  const userName = storageHelpers.getUserName();

  // application state for tasks, UI controls and loading indicator
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // reload tasks when the number of tasks changes (keeps list in sync)
  useEffect(() => {
    loadTasks();
  }, [tasks.length]);

  /**
   * Load tasks from backend and sort them.
   *
   * @returns {Promise<void>}
   */
  const loadTasks = async () => {
    try {
      // fetch tasks using service and sort by created date (descending)
      const data = await TaskService.getTasks(token);
      setTasks(taskHelpers.sortTasks(data, "createdDesc"));
    } catch (err) {
      // surface error to developer console; UI keeps previous state
      console.error("Failed to load tasks:", err);
    } finally {
      // always clear loading (either success or failure)
      setLoading(false);
    }
  };

  /**
   * Create a new task via service and update local state.
   *
   * @param {Object} taskData - data for the new task
   * @returns {Promise<void>}
   */
  const handleAddTask = async (taskData) => {
    try {
      // call service to create task on server
      const newTask = await TaskService.createTask(taskData, token);
      // append new task to local list and keep it sorted
      setTasks(taskHelpers.sortTasks([...tasks, newTask]), "createdDesc");
      // hide the form after successful add
      setShowForm(false);
    } catch (err) {
      // log failure; parent UI could show an error if desired
      console.error("Failed to add task:", err);
    }
  };

  /**
   * Update an existing task on the server and in local state.
   *
   * @param {Object} taskData - updated task payload (should include taskId)
   * @returns {Promise<void>}
   */
  const handleUpdateTask = async (taskData) => {
    try {
      // send update request and replace updated item in the tasks array
      const updated = await TaskService.updateTask(
        taskData.taskId,
        taskData,
        token
      );
      setTasks(tasks.map((t) => (t.taskId === updated.taskId ? updated : t)));
      // clear editing/visible form state
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  /**
   * Toggle task completion state via service and update local task list.
   *
   * @param {Object} task - task to toggle
   * @returns {Promise<void>}
   */
  const handleToggleTask = async (task) => {
    try {
      // service returns the updated task object
      const updated = await TaskService.toggleTaskCompletion(task, token);
      // replace the toggled task in local state
      setTasks(tasks.map((t) => (t.taskId === updated.taskId ? updated : t)));
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  /**
   * Delete a task using the service and remove it from state.
   *
   * @param {string|number} taskId - id of task to delete
   * @returns {Promise<void>}
   */
  const handleDeleteTask = async (taskId) => {
    try {
      // show loading while delete is in progress
      setLoading(true);
      await TaskService.deleteTask(taskId, token);
      // hide loading and remove task from local list
      setLoading(false);
      console.log("Deleted task with ID:", taskId);
      setTasks(tasks.filter((t) => t.taskId !== taskId));
    } catch (err) {
      // ensure loading state is reset on error
      setLoading(false);
      console.error("Failed to delete task:", err);
    }
  };

  /**
   * Begin editing a task by storing it in state and showing the form.
   *
   * @param {Object} task - task to edit
   * @returns {void}
   */
  const handleEditTask = (task) => {
    // populate form with selected task and open it
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Cancel task form and clear editing state.
   *
   * @returns {void}
   */
  const handleCancelForm = () => {
    // hide the form and discard any editing context
    setShowForm(false);
    setEditingTask(null);
  };

  // compute filtered list and simple stats for header cards
  const filteredTasks = taskHelpers.filterTasks(tasks, filter);
  const stats = taskHelpers.getTaskStats(tasks);

  return (
    <div className="min-h-screen bg-primary">
      {/* Navbar spans full width */}
      <nav className="nav-bar px-4 md:px-6 py-4 w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <LayoutDashboard className="text-tertiary" size={24} />
            {/* Title hidden on mobile, visible on md+ screens */}
            <h1 className="text-xl md:text-2xl font-bold text-primary hidden md:block">
              Task Manager
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {/* Username hidden on small screens, visible on md+ */}
            <span className="text-tertiary text-sm md:text-base hidden sm:inline">
              Welcome, {userName}
            </span>
            {/* Full button on desktop, circular icon on mobile */}
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-2 btn-secondary text-tertiary p-2 md:px-4 md:py-2 rounded transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full px-4 md:px-6 lg:max-w-6xl lg:mx-auto py-6 md:py-8">
        {/* Stats cards with centered labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="card rounded-lg p-4 md:p-6 text-center">
            <div className="label text-sm mb-1">Total Tasks</div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {stats.total}
            </div>
          </div>
          <div className="card rounded-lg p-4 md:p-6 text-center">
            <div className="label text-sm mb-1">Completed</div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {stats.completed}
            </div>
          </div>
          <div className="card rounded-lg p-4 md:p-6 text-center">
            <div className="label text-sm mb-1">Pending</div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {stats.pending}
            </div>
          </div>
        </div>

        {/* Filters and New Task button - responsive layout */}
        <div className="mb-6">
          {/* Scrollable filters on mobile */}
          <div className="overflow-x-auto hide-scrollbar mb-3 md:mb-0">
            <div className="flex gap-2 min-w-max md:min-w-0 pb-2 md:pb-0">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded transition-colors whitespace-nowrap ${
                  filter === "all"
                    ? "btn-primary"
                    : "bg-secondary text-tertiary hover:bg-tertiary"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded transition-colors whitespace-nowrap ${
                  filter === "pending"
                    ? "btn-primary"
                    : "bg-secondary text-tertiary hover:bg-tertiary"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded transition-colors whitespace-nowrap ${
                  filter === "completed"
                    ? "btn-primary"
                    : "bg-secondary text-tertiary hover:bg-tertiary"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("overDue")}
                className={`px-4 py-2 rounded transition-colors whitespace-nowrap ${
                  filter === "overDue"
                    ? "btn-primary"
                    : "bg-secondary text-tertiary hover:bg-tertiary"
                }`}
              >
                Overdue
              </button>
            </div>
          </div>

          {/* New Task button - full width on mobile, right-aligned on desktop */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 btn-primary px-4 py-2.5 md:py-2 rounded transition-colors md:float-right"
            >
              <Plus size={20} />
              New Task
            </button>
          )}

          {/* Clear float */}
          <div className="clear-both"></div>
        </div>

        {/* conditional form for creating or editing tasks */}
        {showForm && (
          <TaskForm
            onAdd={handleAddTask}
            onUpdate={handleUpdateTask}
            onCancel={handleCancelForm}
            editTask={editingTask}
          />
        )}

        {/* show loading state or the filtered task list */}
        {loading ? (
          <div className="text-center py-12 text-muted">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
