import React, { useState } from 'react';
import { 
  X, Calendar, User, Flag, Clock, CheckCircle2, 
  AlertTriangle, MoreHorizontal, Save
} from 'lucide-react';

const TaskEditModal = ({ task, workstream, isOpen, onClose, onSave }) => {
  // Initialize with safe defaults
  const [editedTask, setEditedTask] = useState(() => {
    if (!task) {
      return {
        id: '',
        title: '',
        status: 'not-started',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        progress: 0,
        milestone: false,
        subtasks: []
      };
    }
    return {
      ...task,
      subtasks: task.subtasks || []
    };
  });

  // Update editedTask when task changes
  React.useEffect(() => {
    if (task) {
      setEditedTask({
        ...task,
        subtasks: task.subtasks || []
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const statusOptions = [
    { value: 'not-started', label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700' }
  ];

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const updateSubtask = (subtaskId, completed) => {
    const updatedSubtasks = editedTask.subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed } : st
    );
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
  };

  const addSubtask = () => {
    const newSubtask = {
      id: `${editedTask.id}.${editedTask.subtasks.length + 1}`,
      title: '',
      completed: false
    };
    setEditedTask({ 
      ...editedTask, 
      subtasks: [...editedTask.subtasks, newSubtask] 
    });
  };

  const removeSubtask = (subtaskId) => {
    const updatedSubtasks = editedTask.subtasks.filter(st => st.id !== subtaskId);
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: workstream?.color }}
            />
            <h3 className="text-xl font-semibold text-gray-900">Edit Task</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee and Due Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To
              </label>
              <input
                type="text"
                value={editedTask.assignee}
                onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress ({editedTask.progress}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={editedTask.progress}
              onChange={(e) => setEditedTask({ ...editedTask, progress: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Milestone Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="milestone"
              checked={editedTask.milestone || false}
              onChange={(e) => setEditedTask({ ...editedTask, milestone: e.target.checked })}
              className="rounded text-blue-600"
            />
            <label htmlFor="milestone" className="text-sm font-medium text-gray-700">
              Mark as Milestone
            </label>
          </div>

          {/* Subtasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Subtasks ({editedTask.subtasks.filter(st => st.completed).length}/{editedTask.subtasks.length})
              </label>
              <button
                onClick={addSubtask}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Subtask
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {editedTask.subtasks.map((subtask, index) => (
                <div key={subtask.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(e) => updateSubtask(subtask.id, e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <input
                    type="text"
                    value={subtask.title}
                    onChange={(e) => {
                      const updatedSubtasks = editedTask.subtasks.map(st => 
                        st.id === subtask.id ? { ...st, title: e.target.value } : st
                      );
                      setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
                    }}
                    placeholder="Enter subtask description"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeSubtask(subtask.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                statusOptions.find(s => s.value === editedTask.status)?.color
              }`}>
                {statusOptions.find(s => s.value === editedTask.status)?.label}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                priorityOptions.find(p => p.value === editedTask.priority)?.color
              }`}>
                {priorityOptions.find(p => p.value === editedTask.priority)?.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${editedTask.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Workstream: {workstream?.name}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;