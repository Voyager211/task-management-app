import { useState } from 'react';

const TaskCard = ({ task, onStatusChange, onDelete, priorityColors }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onStatusChange(task._id, 'Todo');
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Move to Todo
              </button>
              <button
                onClick={() => {
                  onStatusChange(task._id, 'In Progress');
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Move to In Progress
              </button>
              <button
                onClick={() => {
                  onStatusChange(task._id, 'Done');
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Move to Done
              </button>
              <hr className="my-1" />
              <button
                onClick={() => {
                  onDelete(task._id);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
