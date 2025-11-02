import { useState, useEffect } from "react";
import { LayoutDashboard, LogOut, Plus } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { TaskService } from "../services/TaskService";
import { taskHelpers } from "../utils/taskHelpers";
import { storageHelpers } from "../utils/storageHelpers";

export const Dashboard = ({ onLogout }) => {
  const token = storageHelpers.getToken();
  const userName = storageHelpers.getUserName();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [tasks.length]);

  const loadTasks = async () => {
    try {
      const data = await TaskService.getTasks(token);
      setTasks(taskHelpers.sortTasks(data, "createdDesc"));
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await TaskService.createTask(taskData, token);
      setTasks(taskHelpers.sortTasks([...tasks, newTask]), "createdDesc");
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updated = await TaskService.updateTask(
        taskData.taskId,
        taskData,
        token
      );
      setTasks(tasks.map((t) => (t.taskId === updated.taskId ? updated : t)));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const updated = await TaskService.toggleTaskCompletion(task, token);
      setTasks(tasks.map((t) => (t.taskId === updated.taskId ? updated : t)));
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await TaskService.deleteTask(taskId, token);
      setLoading(false);
      console.log("Deleted task with ID:", taskId);
      setTasks(tasks.filter((t) => t.taskId !== taskId));
    } catch (err) {
      setLoading(false);
      console.error("Failed to delete task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = taskHelpers.filterTasks(tasks, filter);
  const stats = taskHelpers.getTaskStats(tasks);

  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="bg-neutral-800 border-b border-neutral-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-neutral-400" size={24} />
            <h1 className="text-2xl font-bold text-neutral-100">
              Task Manager
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Welcome, {userName}</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 px-4 py-2 rounded transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="text-neutral-400 text-sm mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-neutral-100">
              {stats.total}
            </div>
          </div>
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="text-neutral-400 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-neutral-100">
              {stats.completed}
            </div>
          </div>
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="text-neutral-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-neutral-100">
              {stats.pending}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded transition-colors ${
                filter === "all"
                  ? "bg-neutral-600 text-neutral-100"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded transition-colors ${
                filter === "pending"
                  ? "bg-neutral-600 text-neutral-100"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded transition-colors ${
                filter === "completed"
                  ? "bg-neutral-600 text-neutral-100"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("overDue")}
              className={`px-4 py-2 rounded transition-colors ${
                filter === "overDue"
                  ? "bg-neutral-600 text-neutral-100"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              Overdue
            </button>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-neutral-600 hover:bg-neutral-500 text-neutral-100 px-4 py-2 rounded transition-colors"
            >
              <Plus size={20} />
              New Task
            </button>
          )}
        </div>

        {showForm && (
          <TaskForm
            onAdd={handleAddTask}
            onUpdate={handleUpdateTask}
            onCancel={handleCancelForm}
            editTask={editingTask}
          />
        )}

        {loading ? (
          <div className="text-center py-12 text-neutral-500">
            Loading tasks...
          </div>
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
