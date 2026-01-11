import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Users, Clock, 
  CheckCircle, AlertCircle, MoreVertical,
  Building2, DollarSign, Laptop, GraduationCap,
  Megaphone, Shield, Settings
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import TaskEditModal from './TaskEditModal';

const Workstreams = () => {
  const { projectData, updateTask, getWorkstreamById } = useProject();
  const [expandedWorkstream, setExpandedWorkstream] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorkstream, setSelectedWorkstream] = useState(null);

  const handleTaskClick = (task, workstream) => {
    setSelectedTask(task);
    setSelectedWorkstream(workstream);
  };

  const handleTaskSave = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
  };

  const getWorkstreamIcon = (workstreamId) => {
    const icons = {
      funding: DollarSign,
      construction: Building2,
      technology: Laptop,
      education: GraduationCap,
      marketing: Megaphone,
      regulatory: Shield,
      operations: Settings,
      hiring: Users
    };
    return icons[workstreamId] || Users;
  };

  const getStatusColor = (status) => {
    const colors = {
      'not-started': 'bg-gray-100 text-gray-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'urgent': 'bg-red-100 text-red-700',
      'completed': 'bg-green-100 text-green-700',
      'planning': 'bg-purple-100 text-purple-700',
      'active': 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      critical: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
      high: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      low: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
    };
    return badges[priority] || badges.medium;
  };

  const toggleWorkstream = (workstreamId) => {
    setExpandedWorkstream(expandedWorkstream === workstreamId ? null : workstreamId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workstream Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {projectData.workstreams.length}
            </div>
            <div className="text-sm text-gray-600">Active Workstreams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {projectData.workstreams.reduce((sum, ws) => sum + ws.tasks.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {projectData.workstreams.reduce((sum, ws) => 
                sum + ws.tasks.filter(t => t.status === 'completed').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Completed Tasks</div>
          </div>
        </div>
      </div>

      {/* Workstreams List */}
      <div className="space-y-4">
        {projectData.workstreams.map((workstream) => {
          const Icon = getWorkstreamIcon(workstream.id);
          const isExpanded = expandedWorkstream === workstream.id;
          const completedTasks = workstream.tasks.filter(t => t.status === 'completed').length;
          const progressPercent = workstream.tasks.length > 0 
            ? (completedTasks / workstream.tasks.length) * 100 
            : 0;

          return (
            <div key={workstream.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Workstream Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleWorkstream(workstream.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${workstream.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: workstream.color }} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{workstream.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">Lead: {workstream.lead}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workstream.status)}`}>
                          {workstream.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {completedTasks}/{workstream.tasks.length} tasks
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {progressPercent.toFixed(0)}% complete
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${progressPercent}%`,
                      backgroundColor: workstream.color 
                    }}
                  />
                </div>
              </div>

              {/* Expanded Task List */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="p-6 space-y-3">
                    {workstream.tasks.map((task) => {
                      const priorityBadge = getPriorityBadge(task.priority);
                      const PriorityIcon = priorityBadge.icon;

                      return (
                        <div 
                          key={task.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleTaskClick(task, workstream)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h5 className="font-medium text-gray-900">{task.title}</h5>
                                {task.milestone && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                    Milestone
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 flex items-center space-x-4 text-sm">
                                <span className="text-gray-600">
                                  Assigned to: <span className="font-medium">{task.assignee}</span>
                                </span>
                                <span className="text-gray-600">
                                  Due: <span className="font-medium">
                                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                  </span>
                                </span>
                                <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge.bg} ${priorityBadge.text}`}>
                                  <PriorityIcon className="w-3 h-3" />
                                  <span>{task.priority}</span>
                                </span>
                              </div>
                              
                              {/* Subtasks */}
                              {task.subtasks && task.subtasks.length > 0 && (
                                <div className="mt-3">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                                  </div>
                                  <div className="space-y-1">
                                    {task.subtasks.slice(0, 2).map(subtask => (
                                      <div key={subtask.id} className="flex items-center space-x-2 text-sm">
                                        <input 
                                          type="checkbox" 
                                          checked={subtask.completed}
                                          readOnly
                                          className="rounded text-blue-600"
                                        />
                                        <span className={subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                                          {subtask.title}
                                        </span>
                                      </div>
                                    ))}
                                    {task.subtasks.length > 2 && (
                                      <div className="text-xs text-gray-500">
                                        +{task.subtasks.length - 2} more
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Progress */}
                            <div className="ml-4 text-right">
                              <div className="text-2xl font-bold" style={{ color: workstream.color }}>
                                {task.progress}%
                              </div>
                              <div className="text-xs text-gray-500">Progress</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Edit Modal */}
      <TaskEditModal
        task={selectedTask}
        workstream={selectedWorkstream}
        isOpen={!!selectedTask}
        onClose={() => {
          setSelectedTask(null);
          setSelectedWorkstream(null);
        }}
        onSave={handleTaskSave}
      />
    </div>
  );
};

export default Workstreams;