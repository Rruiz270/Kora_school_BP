import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Building, Zap, Edit2, Save, X } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const KPITracker = () => {
  const { projectData, updateKPI } = useProject();
  const [editingKPI, setEditingKPI] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEditStart = (kpi) => {
    setEditingKPI(kpi.id);
    setEditValues({
      current: kpi.current,
      target: kpi.target
    });
  };

  const handleEditSave = (kpiId) => {
    updateKPI(kpiId, editValues);
    setEditingKPI(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingKPI(null);
    setEditValues({});
  };

  const formatValue = (value, unit) => {
    if (unit === 'R$') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    if (unit === '%') {
      return `${value}%`;
    }
    return `${value.toLocaleString('pt-BR')} ${unit}`;
  };

  const getKPIIcon = (kpiId) => {
    const icons = {
      kpi1: DollarSign,
      kpi2: Users,
      kpi3: Users,
      kpi4: Building,
      kpi5: Zap,
      kpi6: TrendingUp
    };
    return icons[kpiId] || TrendingUp;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.kpis.map((kpi) => {
          const Icon = getKPIIcon(kpi.id);
          const percentage = kpi.target > 0 ? (kpi.current / kpi.target) * 100 : 0;
          const progressColor = getProgressColor(percentage);

          return (
            <div key={kpi.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{kpi.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="text-lg font-bold text-gray-900">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditStart(kpi)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {editingKPI === kpi.id ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Current</span>
                      <input
                        type="number"
                        value={editValues.current}
                        onChange={(e) => setEditValues({...editValues, current: parseFloat(e.target.value) || 0})}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Target</span>
                      <input
                        type="number"
                        value={editValues.target}
                        onChange={(e) => setEditValues({...editValues, target: parseFloat(e.target.value) || 0})}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mb-3">
                      <button
                        onClick={handleEditCancel}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleEditSave(kpi.id)}
                        className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Save className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className="font-semibold text-gray-900">
                        {formatValue(kpi.current, kpi.unit)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Target</span>
                      <span className="font-semibold text-gray-900">
                        {formatValue(kpi.target, kpi.unit)}
                      </span>
                    </div>
                  </>
                )}
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${progressColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                
                <div className="text-xs text-gray-500">
                  Remaining: {formatValue(kpi.target - kpi.current, kpi.unit)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed KPI Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">KPI Analysis</h3>
        
        <div className="space-y-6">
          {projectData.kpis.map((kpi) => {
            const percentage = kpi.target > 0 ? (kpi.current / kpi.target) * 100 : 0;
            
            return (
              <div key={kpi.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    percentage >= 80 ? 'bg-green-100 text-green-700' :
                    percentage >= 60 ? 'bg-blue-100 text-blue-700' :
                    percentage >= 40 ? 'bg-yellow-100 text-yellow-700' :
                    percentage >= 20 ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {percentage >= 80 ? 'On Track' :
                     percentage >= 60 ? 'Good Progress' :
                     percentage >= 40 ? 'Moderate' :
                     percentage >= 20 ? 'Behind' : 'Critical'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Value</span>
                    <div className="font-semibold text-lg text-gray-900">
                      {formatValue(kpi.current, kpi.unit)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Target Value</span>
                    <div className="font-semibold text-lg text-gray-900">
                      {formatValue(kpi.target, kpi.unit)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">To Target</span>
                    <div className="font-semibold text-lg text-gray-900">
                      {formatValue(kpi.target - kpi.current, kpi.unit)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KPITracker;