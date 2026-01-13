import React, { useState } from 'react';
import { X, FileSpreadsheet, ChevronDown, ChevronRight, Check } from 'lucide-react';

// Report categories and their available variables
const REPORT_CATEGORIES = {
  privatePlan: {
    name: 'Private Plan',
    description: 'Private sector financial projections',
    sections: {
      revenue: {
        name: 'Revenue',
        variables: [
          { id: 'flagship', name: 'Flagship Revenue' },
          { id: 'franchiseRoyalty', name: 'Franchise Royalty' },
          { id: 'franchiseFees', name: 'Franchise Fees' },
          { id: 'franchiseMarketing', name: 'Franchise Marketing' },
          { id: 'adoption', name: 'Adoption Revenue' },
          { id: 'kits', name: 'Kit Revenue' },
          { id: 'totalRevenue', name: 'Total Revenue' }
        ]
      },
      costs: {
        name: 'Costs',
        variables: [
          { id: 'technologyOpex', name: 'Technology OpEx' },
          { id: 'marketing', name: 'Marketing' },
          { id: 'staffCorporate', name: 'Staff Corporate' },
          { id: 'staffFlagship', name: 'Staff Flagship' },
          { id: 'staffFranchiseSupport', name: 'Staff Franchise Support' },
          { id: 'staffAdoptionSupport', name: 'Staff Adoption Support' },
          { id: 'facilities', name: 'Facilities' },
          { id: 'curriculum', name: 'Curriculum' },
          { id: 'teacherTraining', name: 'Teacher Training' },
          { id: 'totalCosts', name: 'Total Costs' }
        ]
      },
      profitability: {
        name: 'Profitability',
        variables: [
          { id: 'ebitda', name: 'EBITDA' },
          { id: 'ebitdaMargin', name: 'EBITDA Margin %' },
          { id: 'taxes', name: 'Taxes' },
          { id: 'netIncome', name: 'Net Income' },
          { id: 'capex', name: 'CAPEX' },
          { id: 'freeCashFlow', name: 'Free Cash Flow' }
        ]
      },
      students: {
        name: 'Students',
        variables: [
          { id: 'flagshipStudents', name: 'Flagship Students' },
          { id: 'franchiseStudents', name: 'Franchise Students' },
          { id: 'adoptionStudents', name: 'Adoption Students' },
          { id: 'totalStudents', name: 'Total Students' },
          { id: 'franchiseCount', name: 'Franchise Count' }
        ]
      },
      pricing: {
        name: 'Pricing',
        variables: [
          { id: 'tuition', name: 'Monthly Tuition' },
          { id: 'adoptionFee', name: 'Adoption Fee' },
          { id: 'kitCost', name: 'Kit Cost' }
        ]
      }
    }
  },
  publicPartnerships: {
    name: 'Public Partnerships',
    description: 'Public sector government partnerships',
    sections: {
      metrics: {
        name: 'Key Metrics',
        variables: [
          { id: 'students', name: 'Students' },
          { id: 'municipalities', name: 'Municipalities' },
          { id: 'marketPenetration', name: 'Market Penetration %' }
        ]
      },
      revenue: {
        name: 'Revenue',
        variables: [
          { id: 'monthly', name: 'Monthly License Fees' },
          { id: 'setup', name: 'Setup Revenue' },
          { id: 'technology', name: 'Technology Revenue' },
          { id: 'training', name: 'Training Revenue' },
          { id: 'totalRevenue', name: 'Total Revenue' }
        ]
      },
      profitability: {
        name: 'Profitability',
        variables: [
          { id: 'costs', name: 'Operating Costs' },
          { id: 'ebitda', name: 'EBITDA' },
          { id: 'margin', name: 'EBITDA Margin %' }
        ]
      }
    }
  },
  consolidated: {
    name: 'Consolidated View',
    description: 'Combined private and public sectors',
    sections: {
      combined: {
        name: 'Combined Metrics',
        variables: [
          { id: 'privateRevenue', name: 'Private Revenue' },
          { id: 'publicRevenue', name: 'Public Revenue' },
          { id: 'totalRevenue', name: 'Total Consolidated Revenue' },
          { id: 'privateEbitda', name: 'Private EBITDA' },
          { id: 'publicEbitda', name: 'Public EBITDA' },
          { id: 'totalEbitda', name: 'Total Consolidated EBITDA' },
          { id: 'privateStudents', name: 'Private Students' },
          { id: 'publicStudents', name: 'Public Students' },
          { id: 'totalStudents', name: 'Total Students' }
        ]
      }
    }
  },
  cashFlow: {
    name: 'Cash Flow',
    description: 'Cash flow analysis and projections',
    sections: {
      privateCashFlow: {
        name: 'Private Cash Flow',
        variables: [
          { id: 'privateRevenue', name: 'Revenue' },
          { id: 'privateCosts', name: 'Operating Costs' },
          { id: 'privateEbitda', name: 'EBITDA' },
          { id: 'privateTaxes', name: 'Taxes' },
          { id: 'privateNetIncome', name: 'Net Income' },
          { id: 'privateCapex', name: 'CAPEX' },
          { id: 'privateFcf', name: 'Free Cash Flow' },
          { id: 'privateCumulativeFcf', name: 'Cumulative FCF' }
        ]
      },
      publicCashFlow: {
        name: 'Public Cash Flow',
        variables: [
          { id: 'publicRevenue', name: 'Revenue' },
          { id: 'publicCosts', name: 'Operating Costs' },
          { id: 'publicEbitda', name: 'EBITDA' },
          { id: 'publicNetIncome', name: 'Net Income' },
          { id: 'publicCumulative', name: 'Cumulative' }
        ]
      },
      combined: {
        name: 'Combined Cash Flow',
        variables: [
          { id: 'combinedCashFlow', name: 'Combined Cash Flow' },
          { id: 'cumulativeCombined', name: 'Cumulative Combined' }
        ]
      },
      keyMetrics: {
        name: 'Key Metrics',
        variables: [
          { id: 'irr', name: 'IRR' },
          { id: 'npv', name: 'NPV' },
          { id: 'paybackPeriod', name: 'Payback Period' }
        ]
      }
    }
  }
};

const ReportBuilder = ({ isOpen, onClose, onGenerateReport }) => {
  const [yearFrom, setYearFrom] = useState(1);
  const [yearTo, setYearTo] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState({
    privatePlan: true,
    publicPartnerships: true,
    consolidated: true,
    cashFlow: true
  });
  const [expandedCategories, setExpandedCategories] = useState({
    privatePlan: true,
    publicPartnerships: false,
    consolidated: false,
    cashFlow: false
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedVariables, setSelectedVariables] = useState(() => {
    // Initialize all variables as selected
    const initial = {};
    Object.entries(REPORT_CATEGORIES).forEach(([catKey, category]) => {
      initial[catKey] = {};
      Object.entries(category.sections).forEach(([secKey, section]) => {
        initial[catKey][secKey] = {};
        section.variables.forEach(variable => {
          initial[catKey][secKey][variable.id] = true;
        });
      });
    });
    return initial;
  });

  if (!isOpen) return null;

  const toggleCategory = (categoryKey) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleCategoryExpand = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleSectionExpand = (categoryKey, sectionKey) => {
    const key = `${categoryKey}-${sectionKey}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleVariable = (categoryKey, sectionKey, variableId) => {
    setSelectedVariables(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        [sectionKey]: {
          ...prev[categoryKey][sectionKey],
          [variableId]: !prev[categoryKey][sectionKey][variableId]
        }
      }
    }));
  };

  const selectAllInSection = (categoryKey, sectionKey, select) => {
    const section = REPORT_CATEGORIES[categoryKey].sections[sectionKey];
    const newSelections = {};
    section.variables.forEach(v => {
      newSelections[v.id] = select;
    });
    setSelectedVariables(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        [sectionKey]: newSelections
      }
    }));
  };

  const selectAllInCategory = (categoryKey, select) => {
    const category = REPORT_CATEGORIES[categoryKey];
    const newCategorySelections = {};
    Object.entries(category.sections).forEach(([secKey, section]) => {
      newCategorySelections[secKey] = {};
      section.variables.forEach(v => {
        newCategorySelections[secKey][v.id] = select;
      });
    });
    setSelectedVariables(prev => ({
      ...prev,
      [categoryKey]: newCategorySelections
    }));
  };

  const handleGenerateReport = () => {
    const reportConfig = {
      yearFrom,
      yearTo,
      categories: selectedCategories,
      variables: selectedVariables
    };
    onGenerateReport(reportConfig);
    onClose();
  };

  const getSelectedCount = (categoryKey, sectionKey) => {
    const sectionVars = selectedVariables[categoryKey]?.[sectionKey] || {};
    return Object.values(sectionVars).filter(Boolean).length;
  };

  const getTotalCount = (categoryKey, sectionKey) => {
    return REPORT_CATEGORIES[categoryKey].sections[sectionKey].variables.length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Custom Report Builder</h2>
              <p className="text-blue-100 text-sm">Select date range and variables to export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Date Range Selection */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Date Range (Years)</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">From Year:</label>
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(year => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">To Year:</label>
                <select
                  value={yearTo}
                  onChange={(e) => setYearTo(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(y => y >= yearFrom).map(year => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-500 ml-4">
                ({yearTo - yearFrom + 1} years selected)
              </div>
            </div>
          </div>

          {/* Categories and Variables */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Select Categories & Variables</h3>

            {Object.entries(REPORT_CATEGORIES).map(([categoryKey, category]) => (
              <div key={categoryKey} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                    selectedCategories[categoryKey] ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleCategoryExpand(categoryKey)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedCategories[categoryKey] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories[categoryKey]}
                        onChange={() => toggleCategory(categoryKey)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => selectAllInCategory(categoryKey, true)}
                      className="text-xs px-2 py-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => selectAllInCategory(categoryKey, false)}
                      className="text-xs px-2 py-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Category Content */}
                {expandedCategories[categoryKey] && selectedCategories[categoryKey] && (
                  <div className="border-t border-gray-200 p-4 bg-white">
                    {Object.entries(category.sections).map(([sectionKey, section]) => {
                      const sectionExpanded = expandedSections[`${categoryKey}-${sectionKey}`];
                      const selectedCount = getSelectedCount(categoryKey, sectionKey);
                      const totalCount = getTotalCount(categoryKey, sectionKey);

                      return (
                        <div key={sectionKey} className="mb-3 last:mb-0">
                          {/* Section Header */}
                          <div
                            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg cursor-pointer"
                            onClick={() => toggleSectionExpand(categoryKey, sectionKey)}
                          >
                            <div className="flex items-center space-x-2">
                              {sectionExpanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                              )}
                              <span className="text-sm font-medium text-gray-700">{section.name}</span>
                              <span className="text-xs text-gray-500">
                                ({selectedCount}/{totalCount} selected)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); selectAllInSection(categoryKey, sectionKey, true); }}
                                className="text-xs px-2 py-0.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                All
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); selectAllInSection(categoryKey, sectionKey, false); }}
                                className="text-xs px-2 py-0.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                              >
                                None
                              </button>
                            </div>
                          </div>

                          {/* Variables */}
                          {sectionExpanded && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 pl-6">
                              {section.variables.map(variable => (
                                <label
                                  key={variable.id}
                                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedVariables[categoryKey]?.[sectionKey]?.[variable.id] || false}
                                    onChange={() => toggleVariable(categoryKey, sectionKey, variable.id)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{variable.name}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">
              {Object.values(selectedCategories).filter(Boolean).length}
            </span> categories selected
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateReport}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
