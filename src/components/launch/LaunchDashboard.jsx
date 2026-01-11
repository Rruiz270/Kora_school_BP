import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle, Clock, XCircle,
  TrendingUp, Users, DollarSign, Calendar,
  ArrowRight, AlertCircle
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import TaskEditModal from './TaskEditModal';

const Dashboard = () => {
  const { projectData, getTasksByStatus, getUpcomingDeadlines, calculateOverallProgress, updateTask, getWorkstreamById } = useProject();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorkstream, setSelectedWorkstream] = useState(null);
  
  const urgentTasks = getTasksByStatus('urgent');
  const criticalTasks = projectData.workstreams.flatMap(ws => 
    ws.tasks.filter(t => t.priority === 'critical' && t.status !== 'completed')
  );
  const upcomingDeadlines = getUpcomingDeadlines(14); // Next 2 weeks
  const overallProgress = calculateOverallProgress();

  const handleTaskClick = (task) => {
    const workstream = getWorkstreamById(task.workstreamId);
    setSelectedTask(task);
    setSelectedWorkstream(workstream);
  };

  const handleTaskSave = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
  };

  const statusColors = {
    'not-started': 'bg-gray-100 text-gray-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'urgent': 'bg-red-100 text-red-700',
    'completed': 'bg-green-100 text-green-700',
    'delayed': 'bg-orange-100 text-orange-700'
  };

  const priorityIcons = {
    'critical': <AlertTriangle className="w-4 h-4 text-red-600" />,
    'high': <AlertCircle className="w-4 h-4 text-orange-600" />,
    'medium': <Clock className="w-4 h-4 text-yellow-600" />,
    'low': <CheckCircle className="w-4 h-4 text-green-600" />
  };

  // Summary cards data
  const summaryCards = [
    {
      title: 'Days to Launch',
      value: Math.ceil((new Date('2027-01-15') - new Date()) / (1000 * 60 * 60 * 24)),
      icon: Calendar,
      color: 'blue',
      trend: 'countdown'
    },
    {
      title: 'Overall Progress',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: 'green',
      progress: overallProgress
    },
    {
      title: 'Critical Tasks',
      value: criticalTasks.length,
      icon: AlertTriangle,
      color: 'red',
      subtitle: `${urgentTasks.length} urgent`
    },
    {
      title: 'Team Members',
      value: projectData.kpis.find(k => k.id === 'kpi3').current,
      icon: Users,
      color: 'purple',
      subtitle: `of ${projectData.kpis.find(k => k.id === 'kpi3').target} target`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                  <Icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                {card.progress && (
                  <div className="text-sm font-medium text-gray-600">
                    {card.progress}%
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              {card.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
              )}
              {card.progress && (
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${card.color}-600 h-2 rounded-full`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Critical Alerts */}
      {urgentTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-900">Urgent Actions Required</h3>
          </div>
          <div className="space-y-3">
            {urgentTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: task.workstreamColor }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">
                      {task.workstreamName} • Due: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-red-600">{task.assignee}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workstream Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workstream Status</h3>
          <div className="space-y-4">
            {projectData.workstreams.map((workstream) => {
              const completedTasks = workstream.tasks.filter(t => t.status === 'completed').length;
              const totalTasks = workstream.tasks.length;
              const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
              
              return (
                <div key={workstream.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: workstream.color }}
                      />
                      <span className="font-medium text-gray-900">{workstream.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {completedTasks}/{totalTasks} tasks
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${progressPercent}%`,
                        backgroundColor: workstream.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {upcomingDeadlines.slice(0, 6).map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2 transition-colors"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center space-x-3">
                  {priorityIcons[task.priority]}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-500">{task.workstreamName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(task.dueDate).toLocaleDateString('pt-BR', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {task.daysUntilDue} days
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Milestones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Milestones</h3>
        <div className="relative">
          <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="space-y-4">
            {projectData.milestones.filter(m => m.critical).slice(0, 5).map((milestone, index) => {
              const isPast = new Date(milestone.date) < new Date();
              const isNear = !isPast && (new Date(milestone.date) - new Date()) < 30 * 24 * 60 * 60 * 1000;
              
              return (
                <div key={milestone.id} className="flex items-center space-x-4">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    isPast ? 'bg-green-100' : isNear ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    {isPast ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${
                        isNear ? 'bg-orange-600' : 'bg-gray-400'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(milestone.date).toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPast ? 'bg-green-100 text-green-700' : 
                    isNear ? 'bg-orange-100 text-orange-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {isPast ? 'Completed' : isNear ? 'Upcoming' : 'Future'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

export default Dashboard;