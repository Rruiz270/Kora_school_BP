import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Users, ListTodo, AlertTriangle, Target,
  DollarSign, TrendingUp, BarChart3, Calculator, Presentation, Settings,
  Building2, ChevronLeft, ChevronRight, Layers, PieChart, FileSpreadsheet,
  Wallet, RotateCcw, Download, FileText
} from 'lucide-react';

// Financial Model
import { FinancialModel, DEFAULT_PARAMETERS, SCENARIO_PRESETS } from './utils/financialModel';
import { exportFinancialPlanToExcel, generateCustomReport } from './utils/excelExport';

// Context Provider for Launch Control
import { ProjectProvider, useProject } from './context/ProjectContext';

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
// ParameterControl is now integrated into FinancialDashboard as a modal
import YearByYearEditor from './components/financial/YearByYearEditor';
import PresentationMode from './components/financial/PresentationMode';
import PublicPartnerships from './components/financial/PublicPartnerships';

// Shared Components
import ErrorBoundary from './components/shared/ErrorBoundary';
import ReportBuilder from './components/shared/ReportBuilder';

// Public Sector Scenario Presets
const PUBLIC_SCENARIO_PRESETS = {
  optimistic: {
    name: 'Optimistic',
    description: 'Strong government partnerships, rapid adoption',
    year1Students: 50000,
    year5Students: 610000,
    year10Students: 2200000,
    pilotMunicipalities: 5,
    year5Municipalities: 25,
    year10Municipalities: 120,
    revenuePerStudentMonth: 250,
    marginsPublic: 0.40
  },
  realistic: {
    name: 'Realistic',
    description: 'Moderate government support, steady growth',
    year1Students: 42500,
    year5Students: 518500,
    year10Students: 1870000,
    pilotMunicipalities: 4,
    year5Municipalities: 21,
    year10Municipalities: 102,
    revenuePerStudentMonth: 212,
    marginsPublic: 0.35
  },
  pessimistic: {
    name: 'Pessimistic',
    description: 'Slow adoption, regulatory challenges',
    year1Students: 35000,
    year5Students: 427000,
    year10Students: 1540000,
    pilotMunicipalities: 3,
    year5Municipalities: 17,
    year10Municipalities: 84,
    revenuePerStudentMonth: 175,
    marginsPublic: 0.30
  }
};

// Function to generate public financial data
const generatePublicFinancialData = (scenario = 'optimistic') => {
  const publicParams = {
    setupFeePerSchool: 50000,
    technologyLicenseFee: 25000,
    teacherTrainingFee: 2000,
    teachersPerSchool: 25,
    ...PUBLIC_SCENARIO_PRESETS[scenario]
  };

  const years = [];

  for (let year = 1; year <= 10; year++) {
    const studentGrowth = Math.min(
      publicParams.year1Students * Math.pow(year / 1, 1.8),
      publicParams.year10Students
    );

    const students = Math.floor(studentGrowth);

    const municipalities = Math.min(
      publicParams.pilotMunicipalities * Math.pow(year / 1, 1.5),
      publicParams.year10Municipalities
    );

    const monthlyRevenue = students * publicParams.revenuePerStudentMonth * 12;
    const setupRevenue = Math.floor(municipalities * 50) * publicParams.setupFeePerSchool;
    const technologyRevenue = Math.floor(municipalities) * publicParams.technologyLicenseFee;
    const trainingRevenue = Math.floor(municipalities * 50 * publicParams.teachersPerSchool) * publicParams.teacherTrainingFee;

    const totalRevenue = monthlyRevenue + setupRevenue + technologyRevenue + trainingRevenue;
    const costs = totalRevenue * (1 - publicParams.marginsPublic);
    const ebitda = totalRevenue - costs;

    years.push({
      year,
      students,
      municipalities: Math.floor(municipalities),
      revenue: {
        monthly: monthlyRevenue,
        setup: setupRevenue,
        technology: technologyRevenue,
        training: trainingRevenue,
        total: totalRevenue
      },
      costs,
      ebitda,
      margin: ebitda / totalRevenue
    });
  }

  return years;
};

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
      { id: 'financial-dashboard', label: 'Private Sector', icon: DollarSign, section: 'financial' },
      { id: 'public-partnerships', label: 'Public Partnerships', icon: Building2, section: 'financial' },
      { id: 'consolidated', label: 'Consolidated View', icon: Layers, section: 'financial' },
      { id: 'year-editor', label: 'Year-by-Year Editor', icon: FileSpreadsheet, section: 'financial' },
      { id: 'cash-flow', label: 'Cash Flow', icon: Wallet, section: 'financial' },
      { id: 'unit-economics', label: 'Unit Economics', icon: Calculator, section: 'financial' },
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
const UnifiedDashboard = ({ financialData, currentScenario, publicModelData, currentPublicScenario, projectData, overallProgress, upcomingDeadlines }) => {
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
          <div className="flex items-center space-x-4">
            <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
              <div className="text-xs text-gray-500">Private</div>
              <div className="font-semibold text-blue-600 capitalize">{currentScenario}</div>
            </div>
            <div className="text-center px-3 py-1 bg-green-50 rounded-lg">
              <div className="text-xs text-gray-500">Public</div>
              <div className="font-semibold text-green-600 capitalize">{currentPublicScenario}</div>
            </div>
            <div className="text-xs text-gray-400">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
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
            Private sector ({currentScenario})
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

// Main App Content Component (with Launch Context)
const AppContentWithContext = () => {
  const { projectData, getUpcomingDeadlines, calculateOverallProgress } = useProject();

  const [activeView, setActiveView] = useState('unified-dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  // Private sector state
  const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);
  const [currentScenario, setCurrentScenario] = useState('realistic');

  // Public sector state
  const [currentPublicScenario, setCurrentPublicScenario] = useState('optimistic');
  const [publicModelData, setPublicModelData] = useState(() => generatePublicFinancialData('optimistic'));

  // Create financial model and calculations
  const model = useMemo(() => new FinancialModel(parameters), [parameters]);
  const financialData = useMemo(() => model.getFinancialSummary(), [model]);

  // Launch data
  const overallProgress = calculateOverallProgress();
  const upcomingDeadlines = getUpcomingDeadlines(14);

  // Update public data when scenario changes
  useEffect(() => {
    if (!publicModelData || publicModelData.length === 0) {
      setPublicModelData(generatePublicFinancialData(currentPublicScenario));
    }
  }, [currentPublicScenario]);

  const handleParameterChange = (newParams) => {
    setParameters(prev => ({ ...prev, ...newParams }));
  };

  const handleScenarioChange = (scenarioKey, scenarioParams) => {
    setCurrentScenario(scenarioKey);
    setParameters(scenarioParams);
  };

  const handlePublicModelChange = (publicParams, publicData, publicScenario) => {
    console.log('App received public data:', { publicParams, publicData, publicScenario });
    setPublicModelData(publicData);
    if (publicScenario) {
      setCurrentPublicScenario(publicScenario);
    }
  };

  const resetAllToDefault = () => {
    // Reset private sector to realistic scenario and clear year-by-year overrides
    const realisticParams = {
      ...SCENARIO_PRESETS.realistic.parameters,
      yearlyOverrides: {}
    };
    setCurrentScenario('realistic');
    setParameters(realisticParams);

    // Reset public sector to optimistic scenario
    setCurrentPublicScenario('optimistic');
    setPublicModelData(generatePublicFinancialData('optimistic'));
  };

  const handleExportToExcel = () => {
    try {
      const filename = exportFinancialPlanToExcel(
        financialData,
        parameters,
        currentScenario,
        publicModelData,
        currentPublicScenario
      );
      console.log(`Exported to: ${filename}`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export. Please try again.');
    }
  };

  const handleGenerateCustomReport = (reportConfig) => {
    try {
      const filename = generateCustomReport(
        financialData,
        parameters,
        currentScenario,
        publicModelData,
        currentPublicScenario,
        reportConfig
      );
      console.log(`Custom report exported to: ${filename}`);
    } catch (error) {
      console.error('Custom report export failed:', error);
      alert('Failed to generate custom report. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeView) {
      // Overview
      case 'unified-dashboard':
        return (
          <UnifiedDashboard
            financialData={financialData}
            currentScenario={currentScenario}
            publicModelData={publicModelData}
            currentPublicScenario={currentPublicScenario}
            projectData={projectData}
            overallProgress={overallProgress}
            upcomingDeadlines={upcomingDeadlines}
          />
        );

      // Financial Views
      case 'financial-dashboard':
        return (
          <FinancialDashboard
            financialData={financialData}
            onScenarioChange={handleScenarioChange}
            onParameterChange={handleParameterChange}
            parameters={parameters}
            currentScenario={currentScenario}
          />
        );
      case 'public-partnerships':
        return (
          <PublicPartnerships
            onPublicModelChange={handlePublicModelChange}
            initialScenario={currentPublicScenario}
          />
        );
      case 'consolidated':
        return (
          <ConsolidatedView
            privateFinancialData={financialData}
            publicModelData={publicModelData}
            currentPrivateScenario={currentScenario}
            currentPublicScenario={currentPublicScenario}
          />
        );
      case 'year-editor':
        return (
          <YearByYearEditor
            parameters={parameters}
            onParameterChange={handleParameterChange}
            financialData={financialData}
            currentScenario={currentScenario}
          />
        );
      case 'cash-flow':
        return (
          <CashFlow
            financialData={financialData}
            parameters={parameters}
            currentScenario={currentScenario}
            publicModelData={publicModelData}
            currentPublicScenario={currentPublicScenario}
          />
        );
      case 'unit-economics':
        return (
          <UnitEconomics
            financialData={financialData}
            parameters={parameters}
            currentScenario={currentScenario}
            publicModelData={publicModelData}
          />
        );
      case 'presentation':
        return (
          <PresentationMode
            financialData={financialData}
            publicModelData={publicModelData}
            currentPrivateScenario={currentScenario}
            currentPublicScenario={currentPublicScenario}
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
        return (
          <UnifiedDashboard
            financialData={financialData}
            currentScenario={currentScenario}
            publicModelData={publicModelData}
            currentPublicScenario={currentPublicScenario}
            projectData={projectData}
            overallProgress={overallProgress}
            upcomingDeadlines={upcomingDeadlines}
          />
        );
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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

        {/* Action Buttons */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 space-y-2">
            <button
              onClick={() => setShowReportBuilder(true)}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              title="Build custom report with date range and variable selection"
            >
              <FileText className="w-4 h-4" />
              <span>Custom Reports</span>
            </button>
            <button
              onClick={handleExportToExcel}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              title="Export full financial plan to Excel"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
            <button
              onClick={resetAllToDefault}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              title="Reset all to default scenarios"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Private:</span>
              <span className="font-medium text-blue-600 capitalize">{currentScenario}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Public:</span>
              <span className="font-medium text-green-600 capitalize">{currentPublicScenario}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">IRR:</span>
              <span className="font-medium text-purple-600">{(financialData.summary.irr * 100).toFixed(1)}%</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-12rem)]">
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

      {/* Report Builder Modal */}
      <ReportBuilder
        isOpen={showReportBuilder}
        onClose={() => setShowReportBuilder(false)}
        onGenerateReport={handleGenerateCustomReport}
      />
    </div>
  );
};

// Main App with Providers
const App = () => {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <AppContentWithContext />
      </ProjectProvider>
    </ErrorBoundary>
  );
};

export default App;
