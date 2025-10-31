import { useState } from 'react';
import { validationHelpers } from '../utils/validationHelpers';

export const TaskForm = ({ onAdd, onCancel, editTask, onUpdate }) => {
  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!validationHelpers.validateTaskTitle(title)) {
      setError('Task title is required');
      return;
    }
    
    if (editTask) {
      onUpdate({ ...editTask, title, description });
    } else {
      onAdd({ title, description, completed: false });
    }
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 mb-6">
      <h3 className="text-xl font-semibold text-neutral-100 mb-4">
        {editTask ? 'Edit Task' : 'New Task'}
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
          <label className="block text-neutral-400 text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-neutral-700 text-neutral-100 border border-neutral-600 rounded px-4 py-2.5 focus:outline-none focus:border-neutral-500 min-h-24 resize-none"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-neutral-600 hover:bg-neutral-500 text-neutral-100 font-semibold py-2.5 rounded transition-colors"
          >
            {editTask ? 'Update' : 'Add Task'}
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