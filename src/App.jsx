import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Calendar, Users, ListTodo, AlertTriangle, Target,
  DollarSign, TrendingUp, BarChart3, Calculator, Presentation, Settings,
  Building2, ChevronLeft, ChevronRight, Layers, PieChart, FileSpreadsheet
} from 'lucide-react';

// Context Providers
import { ProjectProvider, useProject } from './context/ProjectContext';
import { FinancialProvider, useFinancial } from './context/FinancialContext';

// Launch Components
import LaunchDashboard from './components/launch/LaunchDashboard';
import Timeline from './components/launch/Timeline';
import Workstreams from './components/launch/Workstreams';
import TeamView from './components/launch/TeamView';
import RiskMatrix from './components/launch/RiskMatrix';
import KPITracker from './components/launch/KPITracker';
import MasterTimeline from './components/launch/MasterTimeline';

// Financial Components
import FinancialDashboard from './components/financial/FinancialDashboard';
import CashFlow from './components/financial/CashFlow';
import UnitEconomics from './components/financial/UnitEconomics';
import ConsolidatedView from './components/financial/ConsolidatedView';
import ParameterControl from './components/financial/ParameterControl';
import YearByYearEditor from './components/financial/YearByYearEditor';
import PresentationMode from './components/financial/PresentationMode';
import PublicPartnerships from './components/financial/PublicPartnerships';

// Shared Components
import ErrorBoundary from './components/shared/ErrorBoundary';

// Navigation structure
const navigationSections = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      { id: 'unified-dashboard', label: 'Command Center', icon: LayoutDashboard, section: 'overview' }
    ]
  },
  {
    id: 'financial',
    title: 'Business Plan',
    items: [
      { id: 'financial-dashboard', label: 'Financial Overview', icon: DollarSign, section: 'financial' },
      { id: 'cash-flow', label: 'Cash Flow', icon: TrendingUp, section: 'financial' },
      { id: 'unit-economics', label: 'Unit Economics', icon: Calculator, section: 'financial' },
      { id: 'consolidated', label: 'Consolidated View', icon: Layers, section: 'financial' },
      { id: 'parameters', label: 'Model Parameters', icon: Settings, section: 'financial' },
      { id: 'year-editor', label: 'Year-by-Year Editor', icon: FileSpreadsheet, section: 'financial' },
      { id: 'public-partnerships', label: 'Public Partnerships', icon: Building2, section: 'financial' },
      { id: 'presentation', label: 'Presentation Mode', icon: Presentation, section: 'financial' }
    ]
  },
  {
    id: 'launch',
    title: 'Launch Control',
    items: [
      { id: 'launch-dashboard', label: 'Launch Dashboard', icon: Target, section: 'launch' },
      { id: 'master-timeline', label: 'Master Timeline', icon: Calendar, section: 'launch' },
      { id: 'workstreams', label: 'Workstreams', icon: ListTodo, section: 'launch' },
      { id: 'team', label: 'Team & Tasks', icon: Users, section: 'launch' },
      { id: 'timeline', label: 'Gantt Timeline', icon: BarChart3, section: 'launch' },
      { id: 'risks', label: 'Risk Matrix', icon: AlertTriangle, section: 'launch' },
      { id: 'kpis', label: 'KPI Tracker', icon: PieChart, section: 'launch' }
    ]
  }
];

// Unified Dashboard Component
const UnifiedDashboard = () => {
  const { projectData, calculateOverallProgress, getUpcomingDeadlines } = useProject();
  const { getFinancialData, currentScenario } = useFinancial();

  const financialData = useMemo(() => getFinancialData(), [getFinancialData]);
  const overallProgress = calculateOverallProgress();
  const upcomingDeadlines = getUpcomingDeadlines(14);
  const daysToLaunch = Math.ceil((new Date('2027-02-01') - new Date()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-kora-600 to-kora-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kora School Brazil</h1>
            <p className="text-kora-100 mt-1">Business Plan & Launch Control</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{daysToLaunch}</div>
            <div className="text-kora-200 text-sm">days to launch</div>
          </div>
        </div>
      </div>

      {/* Confidential Stamp */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-red-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-lg">
              <div className="text-red-700 font-bold text-sm">CONFIDENTIAL</div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold text-sm">Project Owner: Raphael Ruiz</div>
              <div className="text-xs text-gray-500">AI School Brazil - Command Center</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Financial Metrics */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Year 10 Revenue</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(financialData.summary.year10Revenue)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentScenario} scenario
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">IRR</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(financialData.summary.irr * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {financialData.summary.paybackPeriod} year payback
          </div>
        </div>

        {/* Launch Metrics */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Launch Progress</span>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Upcoming Deadlines</span>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{upcomingDeadlines.length}</div>
          <div className="text-xs text-gray-500 mt-1">
            next 14 days
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-kora-600" />
            Financial Highlights
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Year 10 EBITDA</span>
              <span className="font-semibold">{formatCurrency(financialData.summary.year10Ebitda)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Year 10 Students</span>
              <span className="font-semibold">{financialData.summary.year10Students.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">NPV</span>
              <span className="font-semibold">{formatCurrency(financialData.summary.npv)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Initial Investment</span>
              <span className="font-semibold">{formatCurrency(financialData.summary.capexScenario.initialCapex)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">CAPEX Scenario</span>
              <span className="font-semibold text-kora-600">{financialData.summary.capexScenario.name}</span>
            </div>
          </div>
        </div>

        {/* Launch Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-kora-600" />
            Launch Progress
          </h3>
          <div className="space-y-4">
            {projectData.workstreams.slice(0, 5).map((workstream) => {
              const completedTasks = workstream.tasks.filter(t => t.status === 'completed').length;
              const totalTasks = workstream.tasks.length;
              const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return (
                <div key={workstream.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: workstream.color }}
                      />
                      <span className="text-sm text-gray-700">{workstream.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: workstream.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      {upcomingDeadlines.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-kora-600" />
            Upcoming Deadlines (Next 14 Days)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingDeadlines.slice(0, 6).map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: task.workstreamColor }}
                  />
                  <span className="text-xs text-gray-500">{task.workstreamName}</span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.daysUntilDue <= 3 ? 'bg-red-100 text-red-700' :
                    task.daysUntilDue <= 7 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.daysUntilDue}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const [activeView, setActiveView] = useState('unified-dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { getFinancialData, switchScenario, currentScenario, parameters, updateParameters } = useFinancial();

  const financialData = useMemo(() => getFinancialData(), [getFinancialData]);

  const handleScenarioChange = (scenarioKey, scenarioParams) => {
    switchScenario(scenarioKey, scenarioParams);
  };

  const renderContent = () => {
    switch (activeView) {
      // Overview
      case 'unified-dashboard':
        return <UnifiedDashboard />;

      // Financial Views
      case 'financial-dashboard':
        return (
          <FinancialDashboard
            financialData={financialData}
            onScenarioChange={handleScenarioChange}
            currentScenario={currentScenario}
          />
        );
      case 'cash-flow':
        return <CashFlow financialData={financialData} />;
      case 'unit-economics':
        return <UnitEconomics financialData={financialData} />;
      case 'consolidated':
        return <ConsolidatedView financialData={financialData} />;
      case 'parameters':
        return (
          <ParameterControl
            parameters={parameters}
            onParameterChange={updateParameters}
          />
        );
      case 'year-editor':
        return (
          <YearByYearEditor
            financialData={financialData}
            onUpdateYear={updateParameters}
          />
        );
      case 'public-partnerships':
        return <PublicPartnerships financialData={financialData} />;
      case 'presentation':
        return (
          <PresentationMode
            financialData={financialData}
            currentScenario={currentScenario}
          />
        );

      // Launch Views
      case 'launch-dashboard':
        return <LaunchDashboard />;
      case 'master-timeline':
        return <MasterTimeline />;
      case 'workstreams':
        return <Workstreams />;
      case 'team':
        return <TeamView />;
      case 'timeline':
        return <Timeline />;
      case 'risks':
        return <RiskMatrix />;
      case 'kpis':
        return <KPITracker />;

      default:
        return <UnifiedDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-kora-600 to-kora-700">
          {sidebarCollapsed ? (
            <div className="text-white font-bold text-xl">K</div>
          ) : (
            <div className="text-white font-bold text-xl">Kora School BP</div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigationSections.map((section) => (
            <div key={section.id}>
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-kora-50 text-kora-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-kora-600' : ''}`} />
                      {!sidebarCollapsed && (
                        <span className="ml-3 text-sm font-medium">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          <ErrorBoundary>
            {renderContent()}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

// Main App with Providers
const App = () => {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <FinancialProvider>
          <AppContent />
        </FinancialProvider>
      </ProjectProvider>
    </ErrorBoundary>
  );
};

export default App;
