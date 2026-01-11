import React, { createContext, useContext, useState, useCallback } from 'react';
import { FinancialModel, DEFAULT_PARAMETERS, SCENARIO_PRESETS } from '../utils/financialModel';

const FinancialContext = createContext();

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

export const FinancialProvider = ({ children }) => {
  const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);
  const [currentScenario, setCurrentScenario] = useState('realistic');
  const [model] = useState(() => new FinancialModel(parameters));

  // Update model when parameters change
  const updateParameters = useCallback((newParams) => {
    const updatedParams = { ...parameters, ...newParams };
    setParameters(updatedParams);
    model.updateParameters(updatedParams);
  }, [parameters, model]);

  // Switch scenario
  const switchScenario = useCallback((scenarioKey, scenarioParams) => {
    setCurrentScenario(scenarioKey);
    if (scenarioParams) {
      setParameters(scenarioParams);
      model.updateParameters(scenarioParams);
    } else if (SCENARIO_PRESETS[scenarioKey]) {
      const preset = SCENARIO_PRESETS[scenarioKey].parameters;
      setParameters(preset);
      model.updateParameters(preset);
    }
  }, [model]);

  // Get financial data
  const getFinancialData = useCallback(() => {
    return model.getFinancialSummary();
  }, [model]);

  // Get projection for specific year
  const getYearData = useCallback((year) => {
    return model.calculateYearData(year);
  }, [model]);

  // Get full projection
  const getProjection = useCallback((years = 11) => {
    return model.calculateProjection(years);
  }, [model]);

  // Sensitivity analysis
  const performSensitivityAnalysis = useCallback((parameter, variations) => {
    return model.performSensitivityAnalysis(parameter, variations);
  }, [model]);

  // Compare CAPEX scenarios
  const compareCapexScenarios = useCallback(() => {
    return model.compareScenarios();
  }, [model]);

  // Update year-specific overrides
  const updateYearOverride = useCallback((year, overrides) => {
    const newOverrides = {
      ...parameters.yearlyOverrides,
      [year]: { ...(parameters.yearlyOverrides?.[year] || {}), ...overrides }
    };
    updateParameters({ yearlyOverrides: newOverrides });
  }, [parameters, updateParameters]);

  // Clear year override
  const clearYearOverride = useCallback((year) => {
    const newOverrides = { ...parameters.yearlyOverrides };
    delete newOverrides[year];
    updateParameters({ yearlyOverrides: newOverrides });
  }, [parameters, updateParameters]);

  const value = {
    parameters,
    currentScenario,
    model,
    updateParameters,
    switchScenario,
    getFinancialData,
    getYearData,
    getProjection,
    performSensitivityAnalysis,
    compareCapexScenarios,
    updateYearOverride,
    clearYearOverride,
    SCENARIO_PRESETS
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};

export default FinancialContext;
