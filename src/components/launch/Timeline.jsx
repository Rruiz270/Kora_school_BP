import React, { useState } from 'react';
import { Calendar, CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import TaskEditModal from './TaskEditModal';

const Timeline = () => {
  const { projectData, updateTask, getWorkstreamById } = useProject();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorkstream, setSelectedWorkstream] = useState(null);

  const handleTaskClick = (task) => {
    if (task.type === 'task') {
      const workstream = getWorkstreamById(task.workstreamId);
      setSelectedTask(task);
      setSelectedWorkstream(workstream);
    }
  };

  const handleTaskSave = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
  };
  
  // Generate timeline data from workstreams
  const generateTimelineData = () => {
    const timelineItems = [];
    
    projectData.workstreams.forEach(workstream => {
      workstream.tasks.forEach(task => {
        timelineItems.push({
          ...task,
          type: 'task',
          workstreamId: workstream.id,
          workstreamName: workstream.name,
          workstreamColor: workstream.color,
          date: task.dueDate
        });
      });
    });
    
    projectData.milestones.forEach(milestone => {
      timelineItems.push({
        ...milestone,
        type: 'milestone'
      });
    });
    
    return timelineItems.sort((a, b) => new Date(a.date || a.dueDate) - new Date(b.date || b.dueDate));
  };
  
  const timelineData = generateTimelineData();
  
  // Group timeline items by month
  const groupByMonth = (items) => {
    const grouped = {};
    items.forEach(item => {
      const date = new Date(item.date || item.dueDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          month: date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
          items: []
        };
      }
      grouped[monthKey].items.push(item);
    });
    return Object.values(grouped);
  };
  
  const monthlyData = groupByMonth(timelineData);
  
  const getStatusIcon = (item) => {
    if (item.type === 'milestone') {
      return item.status === 'completed' ? 
        <CheckCircle className="w-5 h-5 text-green-600" /> :
        <Circle className="w-5 h-5 text-gray-400" />;
    }
    
    switch (item.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4 text-gray-400" />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {monthlyData.map((monthData, monthIndex) => (
          <div key={monthIndex} className="mb-8">
            {/* Month Header */}
            <div className="sticky top-0 z-10 bg-gray-50 py-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
                <h4 className="text-lg font-semibold text-gray-900 capitalize">
                  {monthData.month}
                </h4>
              </div>
            </div>
            
            {/* Month Items */}
            <div className="mt-4 space-y-4">
              {monthData.items.map((item, itemIndex) => {
                const isTask = item.type === 'task';
                const isMilestone = item.type === 'milestone';
                
                return (
                  <div key={item.id} className="relative flex items-start space-x-4">
                    {/* Timeline Line */}
                    {itemIndex < monthData.items.length - 1 && (
                      <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-300"></div>
                    )}
                    
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <div className={`${
                        isMilestone ? 'w-12 h-12 bg-purple-100 rounded-full' : 
                        'w-10 h-10 bg-white rounded-full border-2'
                      } flex items-center justify-center`}
                      style={{ borderColor: isTask ? item.workstreamColor : undefined }}>
                        {getStatusIcon(item)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className={`bg-white rounded-lg shadow p-4 ${
                        isMilestone ? 'border-2 border-purple-200' : ''
                      } ${isTask ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                      onClick={() => isTask && handleTaskClick(item)}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">
                              {item.title}
                            </h5>
                            {isTask && (
                              <div className="mt-1 flex items-center space-x-3 text-sm">
                                <span 
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                  style={{ 
                                    backgroundColor: `${item.workstreamColor}20`,
                                    color: item.workstreamColor 
                                  }}
                                >
                                  {item.workstreamName}
                                </span>
                                <span className="text-gray-500">
                                  Assigned to: {item.assignee}
                                </span>
                                {item.priority === 'critical' && (
                                  <span className="text-red-600 font-medium">Critical</span>
                                )}
                              </div>
                            )}
                            {item.subtasks && (
                              <div className="mt-3 space-y-1">
                                {item.subtasks.map(subtask => (
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
                              </div>
                            )}
                            {isTask && item.progress !== undefined && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-600">Progress</span>
                                  <span className="font-medium">{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                      width: `${item.progress}%`,
                                      backgroundColor: item.workstreamColor 
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(item.date || item.dueDate).toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </div>
                            {isMilestone && item.critical && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 mt-1">
                                Critical
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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

export default Timeline;