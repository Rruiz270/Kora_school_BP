import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROJECT_DATA } from '../data/projectData';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(PROJECT_DATA);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ai-school-project-data');
    if (savedData) {
      try {
        setProjectData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved project data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ai-school-project-data', JSON.stringify(projectData));
  }, [projectData]);

  const updateTask = (taskId, updatedTask) => {
    setProjectData(prevData => ({
      ...prevData,
      workstreams: prevData.workstreams.map(workstream => ({
        ...workstream,
        tasks: workstream.tasks.map(task => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      }))
    }));
  };

  const updateWorkstream = (workstreamId, updatedWorkstream) => {
    setProjectData(prevData => ({
      ...prevData,
      workstreams: prevData.workstreams.map(workstream => 
        workstream.id === workstreamId ? { ...workstream, ...updatedWorkstream } : workstream
      )
    }));
  };

  const addTask = (workstreamId, newTask) => {
    setProjectData(prevData => ({
      ...prevData,
      workstreams: prevData.workstreams.map(workstream => 
        workstream.id === workstreamId 
          ? { ...workstream, tasks: [...workstream.tasks, newTask] }
          : workstream
      )
    }));
  };

  const deleteTask = (taskId) => {
    setProjectData(prevData => ({
      ...prevData,
      workstreams: prevData.workstreams.map(workstream => ({
        ...workstream,
        tasks: workstream.tasks.filter(task => task.id !== taskId)
      }))
    }));
  };

  const updateKPI = (kpiId, updates) => {
    setProjectData(prevData => ({
      ...prevData,
      kpis: prevData.kpis.map(kpi =>
        kpi.id === kpiId ? { ...kpi, ...updates } : kpi
      )
    }));
  };

  const updateMilestone = (milestoneId, updates) => {
    setProjectData(prevData => ({
      ...prevData,
      milestones: prevData.milestones.map(milestone =>
        milestone.id === milestoneId ? { ...milestone, ...updates } : milestone
      )
    }));
  };

  const updateRisk = (riskId, updates) => {
    setProjectData(prevData => ({
      ...prevData,
      risks: prevData.risks.map(risk =>
        risk.id === riskId ? { ...risk, ...updates } : risk
      )
    }));
  };

  const resetToDefault = () => {
    setProjectData(PROJECT_DATA);
    localStorage.removeItem('ai-school-project-data');
  };

  // Helper functions
  const getTasksByStatus = (status) => {
    const tasks = [];
    projectData.workstreams.forEach(workstream => {
      workstream.tasks.forEach(task => {
        if (task.status === status) {
          tasks.push({ 
            ...task, 
            workstreamId: workstream.id, 
            workstreamName: workstream.name, 
            workstreamColor: workstream.color 
          });
        }
      });
    });
    return tasks;
  };

  const getUpcomingDeadlines = (days = 30) => {
    const tasks = [];
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    
    projectData.workstreams.forEach(workstream => {
      workstream.tasks.forEach(task => {
        const taskDate = new Date(task.dueDate);
        if (taskDate >= today && taskDate <= futureDate) {
          tasks.push({ 
            ...task, 
            workstreamId: workstream.id, 
            workstreamName: workstream.name, 
            workstreamColor: workstream.color,
            daysUntilDue: Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24))
          });
        }
      });
    });
    
    return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const calculateOverallProgress = () => {
    let totalTasks = 0;
    let totalProgress = 0;
    
    projectData.workstreams.forEach(workstream => {
      workstream.tasks.forEach(task => {
        totalTasks++;
        totalProgress += task.progress;
      });
    });
    
    return totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;
  };

  const getWorkstreamById = (workstreamId) => {
    return projectData.workstreams.find(ws => ws.id === workstreamId);
  };

  const getTaskById = (taskId) => {
    for (const workstream of projectData.workstreams) {
      const task = workstream.tasks.find(t => t.id === taskId);
      if (task) {
        return {
          ...task,
          workstreamId: workstream.id,
          workstreamName: workstream.name,
          workstreamColor: workstream.color
        };
      }
    }
    return null;
  };

  const value = {
    projectData,
    setProjectData,
    updateTask,
    updateWorkstream,
    addTask,
    deleteTask,
    updateKPI,
    updateMilestone,
    updateRisk,
    resetToDefault,
    getTasksByStatus,
    getUpcomingDeadlines,
    calculateOverallProgress,
    getWorkstreamById,
    getTaskById
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;