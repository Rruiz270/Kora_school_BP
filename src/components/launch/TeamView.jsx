import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import TaskEditModal from './TaskEditModal';

const TeamView = () => {
  const { projectData, updateTask, getWorkstreamById } = useProject();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorkstream, setSelectedWorkstream] = useState(null);

  const handleTaskClick = (task) => {
    const workstream = getWorkstreamById(task.workstreamId);
    setSelectedTask(task);
    setSelectedWorkstream(workstream);
  };

  const handleTaskSave = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
  };

  // Get unique assignees and their tasks
  const getTeamMembers = () => {
    const members = {};

    projectData.workstreams.forEach(workstream => {
      workstream.tasks.forEach(task => {
        // Handle both assignees (array) and assignee (string) formats
        const taskAssignees = task.assignees || (task.assignee ? [task.assignee] : ['Unassigned']);

        taskAssignees.forEach(assignee => {
          if (!assignee) return;

          if (!members[assignee]) {
            members[assignee] = {
              name: assignee,
              role: (assignee.includes('TBH') || assignee.includes('TBD')) ? 'To Be Hired' : 'Team Member',
              tasks: [],
              workstreams: new Set()
            };
          }
          members[assignee].tasks.push({
            ...task,
            workstreamId: workstream.id,
            workstreamName: workstream.name,
            workstreamColor: workstream.color
          });
          members[assignee].workstreams.add(workstream.name);
        });
      });
    });

    return Object.values(members);
  };

  const teamMembers = getTeamMembers();

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTaskStatusColor = (status) => {
    const colors = {
      'completed': 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'urgent': 'bg-red-100 text-red-700',
      'not-started': 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // Helper to check if name indicates TBD/TBH
  const isToBeHired = (name) => {
    if (!name) return false;
    return name.includes('TBH') || name.includes('TBD');
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {teamMembers.filter(m => !isToBeHired(m.name)).length}
            </div>
            <div className="text-sm text-gray-600">Current Team</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {teamMembers.filter(m => isToBeHired(m.name)).length}
            </div>
            <div className="text-sm text-gray-600">To Be Hired</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {teamMembers.reduce((sum, member) => sum + member.tasks.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {teamMembers.reduce((sum, member) =>
                sum + member.tasks.filter(t => t.status === 'completed').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => {
          const completedTasks = member.tasks.filter(t => t.status === 'completed').length;
          const urgentTasks = member.tasks.filter(t => t.status === 'urgent').length;
          const inProgressTasks = member.tasks.filter(t => t.status === 'in-progress').length;
          const isTBH = isToBeHired(member.name);

          return (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Member Header */}
              <div className={`p-6 ${isTBH ? 'bg-orange-50' : 'bg-blue-50'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isTBH ? 'bg-orange-200' : 'bg-blue-200'
                  }`}>
                    <User className={`w-6 h-6 ${
                      isTBH ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {Array.from(member.workstreams).slice(0, 2).map(workstream => (
                        <span key={workstream} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-gray-700">
                          {workstream}
                        </span>
                      ))}
                      {member.workstreams.size > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-gray-700">
                          +{member.workstreams.size - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Summary */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{completedTasks}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{inProgressTasks}</div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">{urgentTasks}</div>
                    <div className="text-xs text-gray-600">Urgent</div>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900 text-sm">Recent Tasks</h5>
                  {member.tasks.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors rounded px-2"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="flex items-center space-x-2">
                        {getTaskStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: task.workstreamColor }}
                        />
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {member.tasks.length > 4 && (
                    <div className="text-xs text-gray-500 text-center py-2">
                      +{member.tasks.length - 4} more tasks
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">
                      {member.tasks.length > 0 ? Math.round((completedTasks / member.tasks.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${member.tasks.length > 0 ? (completedTasks / member.tasks.length) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>
              </div>
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

export default TeamView;
