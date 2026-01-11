import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, Edit2, Save, X } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const RiskMatrix = () => {
  const { projectData, updateRisk } = useProject();
  const [editingRisk, setEditingRisk] = useState(null);
  const [editValues, setEditValues] = useState({});
  
  const probabilityLevels = ['low', 'medium', 'high'];
  const impactLevels = ['low', 'medium', 'high', 'critical'];

  const handleEditStart = (risk) => {
    setEditingRisk(risk.id);
    setEditValues({
      title: risk.title,
      probability: risk.probability,
      impact: risk.impact,
      owner: risk.owner,
      mitigation: risk.mitigation
    });
  };

  const handleEditSave = (riskId) => {
    updateRisk(riskId, editValues);
    setEditingRisk(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingRisk(null);
    setEditValues({});
  };

  const getRiskScore = (probability, impact) => {
    const probScore = probabilityLevels.indexOf(probability) + 1;
    const impactScore = impactLevels.indexOf(impact) + 1;
    return probScore * impactScore;
  };

  const getRiskColor = (probability, impact) => {
    const score = getRiskScore(probability, impact);
    if (score >= 9) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskLevel = (probability, impact) => {
    const score = getRiskScore(probability, impact);
    if (score >= 9) return 'Critical';
    if (score >= 6) return 'High';
    if (score >= 3) return 'Medium';
    return 'Low';
  };

  const getRiskIcon = (probability, impact) => {
    const score = getRiskScore(probability, impact);
    if (score >= 9) return <AlertTriangle className="w-4 h-4" />;
    if (score >= 6) return <AlertCircle className="w-4 h-4" />;
    return <Info className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['low', 'medium', 'high', 'critical'].map(level => {
            const count = projectData.risks.filter(risk => 
              getRiskLevel(risk.probability, risk.impact).toLowerCase() === level
            ).length;
            
            const colors = {
              low: 'text-green-600',
              medium: 'text-yellow-600',
              high: 'text-orange-600',
              critical: 'text-red-600'
            };

            return (
              <div key={level} className="text-center">
                <div className={`text-3xl font-bold ${colors[level]}`}>{count}</div>
                <div className="text-sm text-gray-600 capitalize">{level} Risk</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Matrix */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-sm font-medium text-gray-700">Impact →</th>
                  {impactLevels.map(impact => (
                    <th key={impact} className="p-2 text-sm font-medium text-gray-700 capitalize text-center">
                      {impact}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {probabilityLevels.reverse().map(probability => (
                  <tr key={probability}>
                    <td className="p-2 text-sm font-medium text-gray-700 capitalize">
                      {probability}
                    </td>
                    {impactLevels.map(impact => {
                      const cellRisks = projectData.risks.filter(
                        risk => risk.probability === probability && risk.impact === impact
                      );
                      const cellColor = getRiskColor(probability, impact);
                      
                      return (
                        <td key={impact} className="p-1">
                          <div 
                            className={`${cellColor} rounded p-2 min-h-[50px] flex flex-col justify-center items-center text-white text-xs`}
                          >
                            {cellRisks.length > 0 && (
                              <>
                                <div className="font-medium">{cellRisks.length}</div>
                                <div className="text-center">
                                  {cellRisks.slice(0, 2).map(risk => (
                                    <div key={risk.id} className="truncate max-w-[80px]">
                                      {risk.title}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            ↑ Probability | Numbers indicate risk count in each cell
          </div>
        </div>

        {/* Risk List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Register</h3>
          <div className="space-y-4">
            {projectData.risks
              .sort((a, b) => getRiskScore(b.probability, b.impact) - getRiskScore(a.probability, a.impact))
              .map((risk) => {
                const riskLevel = getRiskLevel(risk.probability, risk.impact);
                const riskColor = getRiskColor(risk.probability, risk.impact);
                const riskIcon = getRiskIcon(risk.probability, risk.impact);
                
                return (
                  <div key={risk.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {editingRisk === risk.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editValues.title}
                          onChange={(e) => setEditValues({...editValues, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Risk title"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Probability</label>
                            <select
                              value={editValues.probability}
                              onChange={(e) => setEditValues({...editValues, probability: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              {probabilityLevels.map(level => (
                                <option key={level} value={level} className="capitalize">{level}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                            <select
                              value={editValues.impact}
                              onChange={(e) => setEditValues({...editValues, impact: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              {impactLevels.map(level => (
                                <option key={level} value={level} className="capitalize">{level}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={editValues.owner}
                          onChange={(e) => setEditValues({...editValues, owner: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Risk owner"
                        />
                        <textarea
                          value={editValues.mitigation}
                          onChange={(e) => setEditValues({...editValues, mitigation: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={3}
                          placeholder="Mitigation strategy"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleEditCancel}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-1"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={() => handleEditSave(risk.id)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`${riskColor} rounded p-2 text-white`}>
                              {riskIcon}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{risk.title}</h4>
                              <div className="flex items-center space-x-4 mt-1 text-sm">
                                <span className="text-gray-600">
                                  Owner: <span className="font-medium">{risk.owner}</span>
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${riskColor}`}>
                                  {riskLevel} Risk
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="text-right text-sm">
                              <div className="text-gray-600">Impact</div>
                              <div className="font-medium capitalize">{risk.impact}</div>
                              <div className="text-gray-600 mt-1">Probability</div>
                              <div className="font-medium capitalize">{risk.probability}</div>
                            </div>
                            <button
                              onClick={() => handleEditStart(risk)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">Mitigation Strategy</h5>
                          <p className="text-sm text-gray-700">{risk.mitigation}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Risk Action Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Immediate Risk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectData.risks
            .filter(risk => getRiskScore(risk.probability, risk.impact) >= 6)
            .map((risk) => (
              <div key={risk.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-medium text-red-900">{risk.title}</h4>
                </div>
                <p className="text-sm text-red-700 mb-2">{risk.mitigation}</p>
                <div className="text-xs text-red-600">
                  Assigned to: <span className="font-medium">{risk.owner}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMatrix;