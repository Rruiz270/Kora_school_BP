// Excel Export Utility for Financial Plan
import * as XLSX from 'xlsx';

// Format currency for Excel
const formatCurrency = (value) => {
  return Math.round(value);
};

// Generate Private Plan sheet data
const generatePrivatePlanData = (financialData, parameters, currentScenario) => {
  const projection = financialData.projection;

  // Header row
  const data = [
    ['KORA SCHOOL - PRIVATE SECTOR FINANCIAL PLAN'],
    [`Scenario: ${currentScenario.toUpperCase()}`],
    [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
    [],
    ['REVENUE PROJECTION (10 Years)'],
    ['Year', 'Flagship Revenue', 'Franchise Royalty', 'Franchise Fees', 'Adoption Revenue', 'Kit Revenue', 'TOTAL REVENUE'],
  ];

  // Add year-by-year data
  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      formatCurrency(year.revenue.flagship),
      formatCurrency(year.revenue.franchiseRoyalty),
      formatCurrency(year.revenue.franchiseFees),
      formatCurrency(year.revenue.adoption),
      formatCurrency(year.revenue.kits),
      formatCurrency(year.revenue.total)
    ]);
  });

  // Add spacing
  data.push([]);
  data.push(['COST STRUCTURE']);
  data.push(['Year', 'Technology OpEx', 'Marketing', 'Staff (Corporate)', 'Staff (Flagship)', 'Facilities', 'Other Costs', 'TOTAL COSTS']);

  projection.forEach((year) => {
    const otherCosts = year.costs.curriculum + year.costs.teacherTraining + year.costs.studentSupport +
                       year.costs.qualityAssurance + year.costs.regulatoryCompliance + year.costs.badDebt +
                       year.costs.paymentProcessing + year.costs.platformRD + year.costs.contentDevelopment +
                       year.costs.legal + year.costs.insurance + year.costs.travel + year.costs.workingCapital +
                       year.costs.contingency + year.costs.staffFranchiseSupport + year.costs.staffAdoptionSupport +
                       year.costs.dataManagement + year.costs.parentEngagement;

    data.push([
      `Year ${year.year}`,
      formatCurrency(year.costs.technologyOpex),
      formatCurrency(year.costs.marketing),
      formatCurrency(year.costs.staffCorporate),
      formatCurrency(year.costs.staffFlagship),
      formatCurrency(year.costs.facilities),
      formatCurrency(otherCosts),
      formatCurrency(year.costs.total)
    ]);
  });

  // Add spacing
  data.push([]);
  data.push(['PROFITABILITY']);
  data.push(['Year', 'Revenue', 'Total Costs', 'EBITDA', 'EBITDA Margin %', 'Taxes', 'Net Income', 'CAPEX', 'Free Cash Flow']);

  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      formatCurrency(year.revenue.total),
      formatCurrency(year.costs.total),
      formatCurrency(year.ebitda),
      `${(year.ebitdaMargin * 100).toFixed(1)}%`,
      formatCurrency(year.taxes),
      formatCurrency(year.netIncome),
      formatCurrency(year.capex),
      formatCurrency(year.freeCashFlow)
    ]);
  });

  // Add spacing
  data.push([]);
  data.push(['STUDENT METRICS']);
  data.push(['Year', 'Flagship Students', 'Franchise Students', 'Adoption Students', 'TOTAL STUDENTS', 'Franchise Count']);

  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      year.students.flagship,
      year.students.franchise,
      year.students.adoption,
      year.students.total,
      year.franchiseCount
    ]);
  });

  // Add spacing
  data.push([]);
  data.push(['KEY METRICS SUMMARY']);
  data.push(['Metric', 'Value']);
  data.push(['Year 10 Revenue', formatCurrency(financialData.summary.year10Revenue)]);
  data.push(['Year 10 EBITDA', formatCurrency(financialData.summary.year10Ebitda)]);
  data.push(['Year 10 Students', financialData.summary.year10Students]);
  data.push(['IRR', `${(financialData.summary.irr * 100).toFixed(1)}%`]);
  data.push(['NPV', formatCurrency(financialData.summary.npv)]);
  data.push(['Payback Period', `${financialData.summary.paybackPeriod} years`]);
  data.push(['CAPEX Scenario', financialData.summary.capexScenario.name]);
  data.push(['Initial Investment', formatCurrency(financialData.summary.capexScenario.initialCapex)]);

  return data;
};

// Generate Public Partnerships sheet data
const generatePublicPartnershipsData = (publicModelData, currentPublicScenario) => {
  if (!publicModelData || publicModelData.length === 0) {
    return [['No public partnerships data available']];
  }

  const data = [
    ['KORA SCHOOL - PUBLIC SECTOR PARTNERSHIPS'],
    [`Scenario: ${currentPublicScenario.toUpperCase()}`],
    [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
    [],
    ['PUBLIC SECTOR 10-YEAR PROJECTION'],
    ['Year', 'Students', 'Municipalities', 'Monthly Revenue', 'Setup Revenue', 'Technology Revenue', 'Training Revenue', 'TOTAL REVENUE', 'Costs', 'EBITDA', 'Margin %'],
  ];

  publicModelData.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      year.students,
      year.municipalities,
      formatCurrency(year.revenue.monthly),
      formatCurrency(year.revenue.setup),
      formatCurrency(year.revenue.technology),
      formatCurrency(year.revenue.training),
      formatCurrency(year.revenue.total),
      formatCurrency(year.costs),
      formatCurrency(year.ebitda),
      `${(year.margin * 100).toFixed(1)}%`
    ]);
  });

  // Add cumulative summary
  data.push([]);
  data.push(['CUMULATIVE TOTALS']);

  const totalRevenue = publicModelData.reduce((sum, y) => sum + y.revenue.total, 0);
  const totalEbitda = publicModelData.reduce((sum, y) => sum + y.ebitda, 0);
  const year10 = publicModelData[publicModelData.length - 1];

  data.push(['Total 10-Year Revenue', formatCurrency(totalRevenue)]);
  data.push(['Total 10-Year EBITDA', formatCurrency(totalEbitda)]);
  data.push(['Year 10 Students', year10.students]);
  data.push(['Year 10 Municipalities', year10.municipalities]);
  data.push(['Market Penetration (of 46.7M)', `${((year10.students / 46700000) * 100).toFixed(2)}%`]);

  return data;
};

// Generate Consolidated View sheet data
const generateConsolidatedData = (financialData, publicModelData, currentScenario, currentPublicScenario) => {
  const data = [
    ['KORA SCHOOL - CONSOLIDATED FINANCIAL VIEW'],
    [`Private Scenario: ${currentScenario.toUpperCase()} | Public Scenario: ${currentPublicScenario.toUpperCase()}`],
    [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
    [],
    ['CONSOLIDATED REVENUE (Private + Public)'],
    ['Year', 'Private Revenue', 'Public Revenue', 'CONSOLIDATED REVENUE', 'Private EBITDA', 'Public EBITDA', 'CONSOLIDATED EBITDA'],
  ];

  const projection = financialData.projection;

  // Match years (private starts at year 0, public at year 1)
  for (let i = 1; i <= 10; i++) {
    const privateYear = projection[i] || { revenue: { total: 0 }, ebitda: 0 };
    const publicYear = publicModelData?.[i - 1] || { revenue: { total: 0 }, ebitda: 0 };

    data.push([
      `Year ${i}`,
      formatCurrency(privateYear.revenue.total),
      formatCurrency(publicYear.revenue.total),
      formatCurrency(privateYear.revenue.total + publicYear.revenue.total),
      formatCurrency(privateYear.ebitda),
      formatCurrency(publicYear.ebitda),
      formatCurrency(privateYear.ebitda + publicYear.ebitda)
    ]);
  }

  // Add totals
  data.push([]);
  data.push(['10-YEAR TOTALS']);

  const totalPrivateRevenue = projection.slice(1, 11).reduce((sum, y) => sum + y.revenue.total, 0);
  const totalPublicRevenue = publicModelData?.reduce((sum, y) => sum + y.revenue.total, 0) || 0;
  const totalPrivateEbitda = projection.slice(1, 11).reduce((sum, y) => sum + y.ebitda, 0);
  const totalPublicEbitda = publicModelData?.reduce((sum, y) => sum + y.ebitda, 0) || 0;

  data.push(['Total Private Revenue', formatCurrency(totalPrivateRevenue)]);
  data.push(['Total Public Revenue', formatCurrency(totalPublicRevenue)]);
  data.push(['TOTAL CONSOLIDATED REVENUE', formatCurrency(totalPrivateRevenue + totalPublicRevenue)]);
  data.push([]);
  data.push(['Total Private EBITDA', formatCurrency(totalPrivateEbitda)]);
  data.push(['Total Public EBITDA', formatCurrency(totalPublicEbitda)]);
  data.push(['TOTAL CONSOLIDATED EBITDA', formatCurrency(totalPrivateEbitda + totalPublicEbitda)]);

  // Add students comparison
  data.push([]);
  data.push(['STUDENT REACH COMPARISON']);
  data.push(['Year', 'Private Students', 'Public Students', 'TOTAL STUDENTS']);

  for (let i = 1; i <= 10; i++) {
    const privateYear = projection[i] || { students: { total: 0 } };
    const publicYear = publicModelData?.[i - 1] || { students: 0 };

    data.push([
      `Year ${i}`,
      privateYear.students.total,
      publicYear.students,
      privateYear.students.total + publicYear.students
    ]);
  }

  return data;
};

// Generate Year by Year sheet data (detailed breakdown)
const generateYearByYearData = (financialData, parameters) => {
  const projection = financialData.projection;

  const data = [
    ['KORA SCHOOL - YEAR BY YEAR DETAILED BREAKDOWN'],
    [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
    [],
    ['PRICING EVOLUTION'],
    ['Year', 'Monthly Tuition (R$)', 'Adoption Fee (R$)', 'Kit Cost (R$)'],
  ];

  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      Math.round(year.pricing.tuition),
      Math.round(year.pricing.adoptionFee),
      Math.round(year.pricing.kitCost)
    ]);
  });

  // Detailed costs breakdown
  data.push([]);
  data.push(['DETAILED COST BREAKDOWN']);
  data.push([
    'Year', 'Tech OpEx', 'Marketing', 'Staff Corporate', 'Staff Flagship',
    'Staff Franchise Support', 'Staff Adoption Support', 'Facilities',
    'Curriculum', 'Teacher Training', 'Student Support', 'Quality Assurance',
    'Regulatory', 'Bad Debt', 'Payment Processing', 'Platform R&D', 'Content Dev',
    'Legal', 'Insurance', 'Travel', 'Working Capital', 'Contingency'
  ]);

  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      formatCurrency(year.costs.technologyOpex),
      formatCurrency(year.costs.marketing),
      formatCurrency(year.costs.staffCorporate),
      formatCurrency(year.costs.staffFlagship),
      formatCurrency(year.costs.staffFranchiseSupport),
      formatCurrency(year.costs.staffAdoptionSupport),
      formatCurrency(year.costs.facilities),
      formatCurrency(year.costs.curriculum),
      formatCurrency(year.costs.teacherTraining),
      formatCurrency(year.costs.studentSupport),
      formatCurrency(year.costs.qualityAssurance),
      formatCurrency(year.costs.regulatoryCompliance),
      formatCurrency(year.costs.badDebt),
      formatCurrency(year.costs.paymentProcessing),
      formatCurrency(year.costs.platformRD),
      formatCurrency(year.costs.contentDevelopment),
      formatCurrency(year.costs.legal),
      formatCurrency(year.costs.insurance),
      formatCurrency(year.costs.travel),
      formatCurrency(year.costs.workingCapital),
      formatCurrency(year.costs.contingency)
    ]);
  });

  // Revenue breakdown
  data.push([]);
  data.push(['DETAILED REVENUE BREAKDOWN']);
  data.push(['Year', 'Flagship', 'Franchise Royalty', 'Franchise Marketing', 'Franchise Fees', 'Adoption', 'Kits', 'TOTAL']);

  projection.forEach((year) => {
    data.push([
      `Year ${year.year}`,
      formatCurrency(year.revenue.flagship),
      formatCurrency(year.revenue.franchiseRoyalty),
      formatCurrency(year.revenue.franchiseMarketing),
      formatCurrency(year.revenue.franchiseFees),
      formatCurrency(year.revenue.adoption),
      formatCurrency(year.revenue.kits),
      formatCurrency(year.revenue.total)
    ]);
  });

  // Model Parameters
  data.push([]);
  data.push(['MODEL PARAMETERS']);
  data.push(['Parameter', 'Value']);
  data.push(['Flagship Students Target', parameters.flagshipStudents]);
  data.push(['Franchise Count Target', parameters.franchiseCount]);
  data.push(['Students per Franchise', parameters.studentsPerFranchise]);
  data.push(['Adoption Students Target', parameters.adoptionStudents]);
  data.push(['Flagship Tuition (Monthly)', parameters.flagshipTuition]);
  data.push(['Adoption License Fee', parameters.adoptionLicenseFee]);
  data.push(['Franchise Royalty Rate', `${(parameters.franchiseRoyaltyRate * 100).toFixed(1)}%`]);
  data.push(['Marketing Fee Rate', `${(parameters.marketingFeeRate * 100).toFixed(1)}%`]);
  data.push(['Franchise Fee', parameters.franchiseFee]);
  data.push(['Kit Cost per Student', parameters.kitCostPerStudent]);
  data.push(['Tuition Increase Rate', `${(parameters.tuitionIncreaseRate * 100).toFixed(1)}%`]);
  data.push(['Franchise Growth Rate', parameters.franchiseGrowthRate]);
  data.push(['Adoption Growth Rate', `${(parameters.adoptionGrowthRate * 100).toFixed(0)}%`]);
  data.push(['CAPEX Scenario', parameters.capexScenario]);

  return data;
};

// Generate Cash Flow sheet data
const generateCashFlowData = (financialData, publicModelData, currentScenario, currentPublicScenario) => {
  const projection = financialData.projection;

  const data = [
    ['KORA SCHOOL - CASH FLOW ANALYSIS'],
    [`Private Scenario: ${currentScenario.toUpperCase()} | Public Scenario: ${currentPublicScenario.toUpperCase()}`],
    [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
    [],
    ['PRIVATE SECTOR CASH FLOW'],
    ['Year', 'Revenue', 'Operating Costs', 'EBITDA', 'Taxes (25%)', 'Net Income', 'CAPEX', 'FREE CASH FLOW', 'Cumulative FCF'],
  ];

  let cumulativeFCF = 0;
  projection.forEach((year) => {
    cumulativeFCF += year.freeCashFlow;
    data.push([
      `Year ${year.year}`,
      formatCurrency(year.revenue.total),
      formatCurrency(year.costs.total),
      formatCurrency(year.ebitda),
      formatCurrency(year.taxes),
      formatCurrency(year.netIncome),
      formatCurrency(year.capex),
      formatCurrency(year.freeCashFlow),
      formatCurrency(cumulativeFCF)
    ]);
  });

  // Public sector cash flow
  if (publicModelData && publicModelData.length > 0) {
    data.push([]);
    data.push(['PUBLIC SECTOR CASH FLOW']);
    data.push(['Year', 'Revenue', 'Operating Costs', 'EBITDA', 'Taxes (25%)', 'Net Income', 'Cumulative']);

    let publicCumulative = 0;
    publicModelData.forEach((year) => {
      const taxes = year.ebitda * 0.25;
      const netIncome = year.ebitda - taxes;
      publicCumulative += netIncome;

      data.push([
        `Year ${year.year}`,
        formatCurrency(year.revenue.total),
        formatCurrency(year.costs),
        formatCurrency(year.ebitda),
        formatCurrency(taxes),
        formatCurrency(netIncome),
        formatCurrency(publicCumulative)
      ]);
    });
  }

  // Combined cash flow
  data.push([]);
  data.push(['CONSOLIDATED CASH FLOW SUMMARY']);
  data.push(['Year', 'Private FCF', 'Public Net Income', 'COMBINED CASH FLOW', 'Cumulative Combined']);

  let combinedCumulative = 0;
  for (let i = 0; i <= 10; i++) {
    const privateYear = projection[i] || { freeCashFlow: 0 };
    const publicYear = publicModelData?.[i - 1];
    const publicNetIncome = publicYear ? publicYear.ebitda * 0.75 : 0;
    const combined = privateYear.freeCashFlow + publicNetIncome;
    combinedCumulative += combined;

    data.push([
      `Year ${i}`,
      formatCurrency(privateYear.freeCashFlow),
      formatCurrency(publicNetIncome),
      formatCurrency(combined),
      formatCurrency(combinedCumulative)
    ]);
  }

  // Key cash flow metrics
  data.push([]);
  data.push(['KEY CASH FLOW METRICS']);
  data.push(['Metric', 'Value']);
  data.push(['Initial Investment (CAPEX)', formatCurrency(financialData.summary.capexScenario.initialCapex)]);
  data.push(['IRR', `${(financialData.summary.irr * 100).toFixed(1)}%`]);
  data.push(['NPV (10% discount)', formatCurrency(financialData.summary.npv)]);
  data.push(['Payback Period', `${financialData.summary.paybackPeriod} years`]);
  data.push(['Cumulative Free Cash Flow (10yr)', formatCurrency(financialData.summary.cumulativeFcf)]);
  data.push(['Cumulative EBITDA (10yr)', formatCurrency(financialData.summary.cumulativeEbitda)]);

  // Flagship break-even analysis
  const flagshipBreakeven = financialData.flagshipBreakeven;
  if (flagshipBreakeven) {
    data.push([]);
    data.push(['FLAGSHIP BREAK-EVEN ANALYSIS']);
    data.push(['Break-even Month', flagshipBreakeven.breakEvenMonth]);
    data.push([]);
    data.push(['Month', 'Students', 'Monthly Revenue', 'Monthly Costs', 'Monthly Result', 'Cumulative']);

    flagshipBreakeven.monthlyData.slice(0, 24).forEach((month) => {
      data.push([
        `Month ${month.month}`,
        month.students,
        formatCurrency(month.monthlyRevenue),
        formatCurrency(month.monthlyOperatingCosts),
        formatCurrency(month.monthlyResult),
        formatCurrency(month.cumulativeResult)
      ]);
    });
  }

  return data;
};

// Main export function
export const exportFinancialPlanToExcel = (
  financialData,
  parameters,
  currentScenario,
  publicModelData,
  currentPublicScenario
) => {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Generate all sheets
  const privatePlanData = generatePrivatePlanData(financialData, parameters, currentScenario);
  const publicPartnershipsData = generatePublicPartnershipsData(publicModelData, currentPublicScenario);
  const consolidatedData = generateConsolidatedData(financialData, publicModelData, currentScenario, currentPublicScenario);
  const yearByYearData = generateYearByYearData(financialData, parameters);
  const cashFlowData = generateCashFlowData(financialData, publicModelData, currentScenario, currentPublicScenario);

  // Create worksheets
  const wsPrivate = XLSX.utils.aoa_to_sheet(privatePlanData);
  const wsPublic = XLSX.utils.aoa_to_sheet(publicPartnershipsData);
  const wsConsolidated = XLSX.utils.aoa_to_sheet(consolidatedData);
  const wsYearByYear = XLSX.utils.aoa_to_sheet(yearByYearData);
  const wsCashFlow = XLSX.utils.aoa_to_sheet(cashFlowData);

  // Set column widths for better readability
  const setColumnWidths = (ws, widths) => {
    ws['!cols'] = widths.map(w => ({ wch: w }));
  };

  setColumnWidths(wsPrivate, [12, 18, 18, 18, 18, 18, 20]);
  setColumnWidths(wsPublic, [12, 15, 15, 18, 18, 18, 18, 20, 18, 18, 12]);
  setColumnWidths(wsConsolidated, [12, 20, 20, 25, 20, 20, 25]);
  setColumnWidths(wsYearByYear, [12, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
  setColumnWidths(wsCashFlow, [12, 18, 18, 18, 18, 18, 18, 20, 20]);

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(wb, wsPrivate, 'Private Plan');
  XLSX.utils.book_append_sheet(wb, wsPublic, 'Public Partnerships');
  XLSX.utils.book_append_sheet(wb, wsConsolidated, 'Consolidated View');
  XLSX.utils.book_append_sheet(wb, wsYearByYear, 'Year by Year');
  XLSX.utils.book_append_sheet(wb, wsCashFlow, 'Cash Flow');

  // Generate filename with date
  const date = new Date().toISOString().split('T')[0];
  const filename = `Kora_School_Financial_Plan_${currentScenario}_${currentPublicScenario}_${date}.xlsx`;

  // Write and download file
  XLSX.writeFile(wb, filename);

  return filename;
};

// Custom Report Generation based on user selections
export const generateCustomReport = (
  financialData,
  parameters,
  currentScenario,
  publicModelData,
  currentPublicScenario,
  reportConfig
) => {
  const { yearFrom, yearTo, categories, variables } = reportConfig;
  const wb = XLSX.utils.book_new();

  // Filter projection data by year range
  const filterByYearRange = (data, yearOffset = 0) => {
    return data.filter((item, index) => {
      const year = item.year !== undefined ? item.year : index + yearOffset;
      return year >= yearFrom && year <= yearTo;
    });
  };

  // Generate Private Plan Custom Sheet
  if (categories.privatePlan && variables.privatePlan) {
    const data = [
      ['KORA SCHOOL - PRIVATE SECTOR CUSTOM REPORT'],
      [`Scenario: ${currentScenario.toUpperCase()}`],
      [`Year Range: Year ${yearFrom} to Year ${yearTo}`],
      [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
      []
    ];

    const projection = filterByYearRange(financialData.projection);
    const vars = variables.privatePlan;

    // Revenue section
    if (vars.revenue && Object.values(vars.revenue).some(Boolean)) {
      data.push(['REVENUE']);
      const revenueHeaders = ['Year'];
      const revenueVars = vars.revenue;
      if (revenueVars.flagship) revenueHeaders.push('Flagship Revenue');
      if (revenueVars.franchiseRoyalty) revenueHeaders.push('Franchise Royalty');
      if (revenueVars.franchiseFees) revenueHeaders.push('Franchise Fees');
      if (revenueVars.franchiseMarketing) revenueHeaders.push('Franchise Marketing');
      if (revenueVars.adoption) revenueHeaders.push('Adoption Revenue');
      if (revenueVars.kits) revenueHeaders.push('Kit Revenue');
      if (revenueVars.totalRevenue) revenueHeaders.push('Total Revenue');
      data.push(revenueHeaders);

      projection.forEach(year => {
        const row = [`Year ${year.year}`];
        if (revenueVars.flagship) row.push(formatCurrency(year.revenue.flagship));
        if (revenueVars.franchiseRoyalty) row.push(formatCurrency(year.revenue.franchiseRoyalty));
        if (revenueVars.franchiseFees) row.push(formatCurrency(year.revenue.franchiseFees));
        if (revenueVars.franchiseMarketing) row.push(formatCurrency(year.revenue.franchiseMarketing));
        if (revenueVars.adoption) row.push(formatCurrency(year.revenue.adoption));
        if (revenueVars.kits) row.push(formatCurrency(year.revenue.kits));
        if (revenueVars.totalRevenue) row.push(formatCurrency(year.revenue.total));
        data.push(row);
      });
      data.push([]);
    }

    // Costs section
    if (vars.costs && Object.values(vars.costs).some(Boolean)) {
      data.push(['COSTS']);
      const costHeaders = ['Year'];
      const costVars = vars.costs;
      if (costVars.technologyOpex) costHeaders.push('Technology OpEx');
      if (costVars.marketing) costHeaders.push('Marketing');
      if (costVars.staffCorporate) costHeaders.push('Staff Corporate');
      if (costVars.staffFlagship) costHeaders.push('Staff Flagship');
      if (costVars.staffFranchiseSupport) costHeaders.push('Staff Franchise Support');
      if (costVars.staffAdoptionSupport) costHeaders.push('Staff Adoption Support');
      if (costVars.facilities) costHeaders.push('Facilities');
      if (costVars.curriculum) costHeaders.push('Curriculum');
      if (costVars.teacherTraining) costHeaders.push('Teacher Training');
      if (costVars.totalCosts) costHeaders.push('Total Costs');
      data.push(costHeaders);

      projection.forEach(year => {
        const row = [`Year ${year.year}`];
        if (costVars.technologyOpex) row.push(formatCurrency(year.costs.technologyOpex));
        if (costVars.marketing) row.push(formatCurrency(year.costs.marketing));
        if (costVars.staffCorporate) row.push(formatCurrency(year.costs.staffCorporate));
        if (costVars.staffFlagship) row.push(formatCurrency(year.costs.staffFlagship));
        if (costVars.staffFranchiseSupport) row.push(formatCurrency(year.costs.staffFranchiseSupport));
        if (costVars.staffAdoptionSupport) row.push(formatCurrency(year.costs.staffAdoptionSupport));
        if (costVars.facilities) row.push(formatCurrency(year.costs.facilities));
        if (costVars.curriculum) row.push(formatCurrency(year.costs.curriculum));
        if (costVars.teacherTraining) row.push(formatCurrency(year.costs.teacherTraining));
        if (costVars.totalCosts) row.push(formatCurrency(year.costs.total));
        data.push(row);
      });
      data.push([]);
    }

    // Profitability section
    if (vars.profitability && Object.values(vars.profitability).some(Boolean)) {
      data.push(['PROFITABILITY']);
      const profitHeaders = ['Year'];
      const profitVars = vars.profitability;
      if (profitVars.ebitda) profitHeaders.push('EBITDA');
      if (profitVars.ebitdaMargin) profitHeaders.push('EBITDA Margin %');
      if (profitVars.taxes) profitHeaders.push('Taxes');
      if (profitVars.netIncome) profitHeaders.push('Net Income');
      if (profitVars.capex) profitHeaders.push('CAPEX');
      if (profitVars.freeCashFlow) profitHeaders.push('Free Cash Flow');
      data.push(profitHeaders);

      projection.forEach(year => {
        const row = [`Year ${year.year}`];
        if (profitVars.ebitda) row.push(formatCurrency(year.ebitda));
        if (profitVars.ebitdaMargin) row.push(`${(year.ebitdaMargin * 100).toFixed(1)}%`);
        if (profitVars.taxes) row.push(formatCurrency(year.taxes));
        if (profitVars.netIncome) row.push(formatCurrency(year.netIncome));
        if (profitVars.capex) row.push(formatCurrency(year.capex));
        if (profitVars.freeCashFlow) row.push(formatCurrency(year.freeCashFlow));
        data.push(row);
      });
      data.push([]);
    }

    // Students section
    if (vars.students && Object.values(vars.students).some(Boolean)) {
      data.push(['STUDENTS']);
      const studentHeaders = ['Year'];
      const studentVars = vars.students;
      if (studentVars.flagshipStudents) studentHeaders.push('Flagship Students');
      if (studentVars.franchiseStudents) studentHeaders.push('Franchise Students');
      if (studentVars.adoptionStudents) studentHeaders.push('Adoption Students');
      if (studentVars.totalStudents) studentHeaders.push('Total Students');
      if (studentVars.franchiseCount) studentHeaders.push('Franchise Count');
      data.push(studentHeaders);

      projection.forEach(year => {
        const row = [`Year ${year.year}`];
        if (studentVars.flagshipStudents) row.push(year.students.flagship);
        if (studentVars.franchiseStudents) row.push(year.students.franchise);
        if (studentVars.adoptionStudents) row.push(year.students.adoption);
        if (studentVars.totalStudents) row.push(year.students.total);
        if (studentVars.franchiseCount) row.push(year.franchiseCount);
        data.push(row);
      });
      data.push([]);
    }

    // Pricing section
    if (vars.pricing && Object.values(vars.pricing).some(Boolean)) {
      data.push(['PRICING']);
      const pricingHeaders = ['Year'];
      const pricingVars = vars.pricing;
      if (pricingVars.tuition) pricingHeaders.push('Monthly Tuition');
      if (pricingVars.adoptionFee) pricingHeaders.push('Adoption Fee');
      if (pricingVars.kitCost) pricingHeaders.push('Kit Cost');
      data.push(pricingHeaders);

      projection.forEach(year => {
        const row = [`Year ${year.year}`];
        if (pricingVars.tuition) row.push(Math.round(year.pricing.tuition));
        if (pricingVars.adoptionFee) row.push(Math.round(year.pricing.adoptionFee));
        if (pricingVars.kitCost) row.push(Math.round(year.pricing.kitCost));
        data.push(row);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = Array(15).fill({ wch: 18 });
    XLSX.utils.book_append_sheet(wb, ws, 'Private Plan');
  }

  // Generate Public Partnerships Custom Sheet
  if (categories.publicPartnerships && variables.publicPartnerships && publicModelData?.length > 0) {
    const data = [
      ['KORA SCHOOL - PUBLIC PARTNERSHIPS CUSTOM REPORT'],
      [`Scenario: ${currentPublicScenario.toUpperCase()}`],
      [`Year Range: Year ${yearFrom} to Year ${yearTo}`],
      [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
      []
    ];

    const filteredPublic = publicModelData.filter(y => y.year >= yearFrom && y.year <= yearTo);
    const vars = variables.publicPartnerships;

    // Metrics section
    if (vars.metrics && Object.values(vars.metrics).some(Boolean)) {
      data.push(['KEY METRICS']);
      const metricHeaders = ['Year'];
      const metricVars = vars.metrics;
      if (metricVars.students) metricHeaders.push('Students');
      if (metricVars.municipalities) metricHeaders.push('Municipalities');
      if (metricVars.marketPenetration) metricHeaders.push('Market Penetration %');
      data.push(metricHeaders);

      filteredPublic.forEach(year => {
        const row = [`Year ${year.year}`];
        if (metricVars.students) row.push(year.students);
        if (metricVars.municipalities) row.push(year.municipalities);
        if (metricVars.marketPenetration) row.push(`${((year.students / 46700000) * 100).toFixed(2)}%`);
        data.push(row);
      });
      data.push([]);
    }

    // Revenue section
    if (vars.revenue && Object.values(vars.revenue).some(Boolean)) {
      data.push(['REVENUE']);
      const revenueHeaders = ['Year'];
      const revenueVars = vars.revenue;
      if (revenueVars.monthly) revenueHeaders.push('Monthly License Fees');
      if (revenueVars.setup) revenueHeaders.push('Setup Revenue');
      if (revenueVars.technology) revenueHeaders.push('Technology Revenue');
      if (revenueVars.training) revenueHeaders.push('Training Revenue');
      if (revenueVars.totalRevenue) revenueHeaders.push('Total Revenue');
      data.push(revenueHeaders);

      filteredPublic.forEach(year => {
        const row = [`Year ${year.year}`];
        if (revenueVars.monthly) row.push(formatCurrency(year.revenue.monthly));
        if (revenueVars.setup) row.push(formatCurrency(year.revenue.setup));
        if (revenueVars.technology) row.push(formatCurrency(year.revenue.technology));
        if (revenueVars.training) row.push(formatCurrency(year.revenue.training));
        if (revenueVars.totalRevenue) row.push(formatCurrency(year.revenue.total));
        data.push(row);
      });
      data.push([]);
    }

    // Profitability section
    if (vars.profitability && Object.values(vars.profitability).some(Boolean)) {
      data.push(['PROFITABILITY']);
      const profitHeaders = ['Year'];
      const profitVars = vars.profitability;
      if (profitVars.costs) profitHeaders.push('Operating Costs');
      if (profitVars.ebitda) profitHeaders.push('EBITDA');
      if (profitVars.margin) profitHeaders.push('EBITDA Margin %');
      data.push(profitHeaders);

      filteredPublic.forEach(year => {
        const row = [`Year ${year.year}`];
        if (profitVars.costs) row.push(formatCurrency(year.costs));
        if (profitVars.ebitda) row.push(formatCurrency(year.ebitda));
        if (profitVars.margin) row.push(`${(year.margin * 100).toFixed(1)}%`);
        data.push(row);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = Array(10).fill({ wch: 20 });
    XLSX.utils.book_append_sheet(wb, ws, 'Public Partnerships');
  }

  // Generate Consolidated Custom Sheet
  if (categories.consolidated && variables.consolidated) {
    const data = [
      ['KORA SCHOOL - CONSOLIDATED CUSTOM REPORT'],
      [`Private: ${currentScenario.toUpperCase()} | Public: ${currentPublicScenario.toUpperCase()}`],
      [`Year Range: Year ${yearFrom} to Year ${yearTo}`],
      [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
      []
    ];

    const vars = variables.consolidated?.combined || {};

    if (Object.values(vars).some(Boolean)) {
      data.push(['CONSOLIDATED METRICS']);
      const headers = ['Year'];
      if (vars.privateRevenue) headers.push('Private Revenue');
      if (vars.publicRevenue) headers.push('Public Revenue');
      if (vars.totalRevenue) headers.push('Total Revenue');
      if (vars.privateEbitda) headers.push('Private EBITDA');
      if (vars.publicEbitda) headers.push('Public EBITDA');
      if (vars.totalEbitda) headers.push('Total EBITDA');
      if (vars.privateStudents) headers.push('Private Students');
      if (vars.publicStudents) headers.push('Public Students');
      if (vars.totalStudents) headers.push('Total Students');
      data.push(headers);

      for (let i = yearFrom; i <= yearTo; i++) {
        const privateYear = financialData.projection[i] || { revenue: { total: 0 }, ebitda: 0, students: { total: 0 } };
        const publicYear = publicModelData?.[i - 1] || { revenue: { total: 0 }, ebitda: 0, students: 0 };

        const row = [`Year ${i}`];
        if (vars.privateRevenue) row.push(formatCurrency(privateYear.revenue.total));
        if (vars.publicRevenue) row.push(formatCurrency(publicYear.revenue.total));
        if (vars.totalRevenue) row.push(formatCurrency(privateYear.revenue.total + publicYear.revenue.total));
        if (vars.privateEbitda) row.push(formatCurrency(privateYear.ebitda));
        if (vars.publicEbitda) row.push(formatCurrency(publicYear.ebitda));
        if (vars.totalEbitda) row.push(formatCurrency(privateYear.ebitda + publicYear.ebitda));
        if (vars.privateStudents) row.push(privateYear.students.total);
        if (vars.publicStudents) row.push(publicYear.students);
        if (vars.totalStudents) row.push(privateYear.students.total + publicYear.students);
        data.push(row);
      }
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = Array(12).fill({ wch: 20 });
    XLSX.utils.book_append_sheet(wb, ws, 'Consolidated');
  }

  // Generate Cash Flow Custom Sheet
  if (categories.cashFlow && variables.cashFlow) {
    const data = [
      ['KORA SCHOOL - CASH FLOW CUSTOM REPORT'],
      [`Private: ${currentScenario.toUpperCase()} | Public: ${currentPublicScenario.toUpperCase()}`],
      [`Year Range: Year ${yearFrom} to Year ${yearTo}`],
      [`Generated: ${new Date().toLocaleDateString('pt-BR')}`],
      []
    ];

    const vars = variables.cashFlow;

    // Private Cash Flow
    if (vars.privateCashFlow && Object.values(vars.privateCashFlow).some(Boolean)) {
      data.push(['PRIVATE SECTOR CASH FLOW']);
      const headers = ['Year'];
      const pvars = vars.privateCashFlow;
      if (pvars.privateRevenue) headers.push('Revenue');
      if (pvars.privateCosts) headers.push('Operating Costs');
      if (pvars.privateEbitda) headers.push('EBITDA');
      if (pvars.privateTaxes) headers.push('Taxes');
      if (pvars.privateNetIncome) headers.push('Net Income');
      if (pvars.privateCapex) headers.push('CAPEX');
      if (pvars.privateFcf) headers.push('Free Cash Flow');
      if (pvars.privateCumulativeFcf) headers.push('Cumulative FCF');
      data.push(headers);

      let cumulativeFCF = 0;
      for (let i = yearFrom; i <= yearTo; i++) {
        const year = financialData.projection[i] || {};
        cumulativeFCF += year.freeCashFlow || 0;
        const row = [`Year ${i}`];
        if (pvars.privateRevenue) row.push(formatCurrency(year.revenue?.total || 0));
        if (pvars.privateCosts) row.push(formatCurrency(year.costs?.total || 0));
        if (pvars.privateEbitda) row.push(formatCurrency(year.ebitda || 0));
        if (pvars.privateTaxes) row.push(formatCurrency(year.taxes || 0));
        if (pvars.privateNetIncome) row.push(formatCurrency(year.netIncome || 0));
        if (pvars.privateCapex) row.push(formatCurrency(year.capex || 0));
        if (pvars.privateFcf) row.push(formatCurrency(year.freeCashFlow || 0));
        if (pvars.privateCumulativeFcf) row.push(formatCurrency(cumulativeFCF));
        data.push(row);
      }
      data.push([]);
    }

    // Public Cash Flow
    if (vars.publicCashFlow && Object.values(vars.publicCashFlow).some(Boolean) && publicModelData?.length > 0) {
      data.push(['PUBLIC SECTOR CASH FLOW']);
      const headers = ['Year'];
      const pubvars = vars.publicCashFlow;
      if (pubvars.publicRevenue) headers.push('Revenue');
      if (pubvars.publicCosts) headers.push('Operating Costs');
      if (pubvars.publicEbitda) headers.push('EBITDA');
      if (pubvars.publicNetIncome) headers.push('Net Income');
      if (pubvars.publicCumulative) headers.push('Cumulative');
      data.push(headers);

      let publicCumulative = 0;
      publicModelData.filter(y => y.year >= yearFrom && y.year <= yearTo).forEach(year => {
        const netIncome = year.ebitda * 0.75;
        publicCumulative += netIncome;
        const row = [`Year ${year.year}`];
        if (pubvars.publicRevenue) row.push(formatCurrency(year.revenue.total));
        if (pubvars.publicCosts) row.push(formatCurrency(year.costs));
        if (pubvars.publicEbitda) row.push(formatCurrency(year.ebitda));
        if (pubvars.publicNetIncome) row.push(formatCurrency(netIncome));
        if (pubvars.publicCumulative) row.push(formatCurrency(publicCumulative));
        data.push(row);
      });
      data.push([]);
    }

    // Combined Cash Flow
    if (vars.combined && Object.values(vars.combined).some(Boolean)) {
      data.push(['COMBINED CASH FLOW']);
      const headers = ['Year'];
      const combvars = vars.combined;
      if (combvars.combinedCashFlow) headers.push('Combined Cash Flow');
      if (combvars.cumulativeCombined) headers.push('Cumulative Combined');
      data.push(headers);

      let combinedCumulative = 0;
      for (let i = yearFrom; i <= yearTo; i++) {
        const privateYear = financialData.projection[i] || { freeCashFlow: 0 };
        const publicYear = publicModelData?.[i - 1];
        const publicNetIncome = publicYear ? publicYear.ebitda * 0.75 : 0;
        const combined = privateYear.freeCashFlow + publicNetIncome;
        combinedCumulative += combined;

        const row = [`Year ${i}`];
        if (combvars.combinedCashFlow) row.push(formatCurrency(combined));
        if (combvars.cumulativeCombined) row.push(formatCurrency(combinedCumulative));
        data.push(row);
      }
      data.push([]);
    }

    // Key Metrics
    if (vars.keyMetrics && Object.values(vars.keyMetrics).some(Boolean)) {
      data.push(['KEY METRICS']);
      const kvars = vars.keyMetrics;
      if (kvars.irr) data.push(['IRR', `${(financialData.summary.irr * 100).toFixed(1)}%`]);
      if (kvars.npv) data.push(['NPV', formatCurrency(financialData.summary.npv)]);
      if (kvars.paybackPeriod) data.push(['Payback Period', `${financialData.summary.paybackPeriod} years`]);
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = Array(10).fill({ wch: 20 });
    XLSX.utils.book_append_sheet(wb, ws, 'Cash Flow');
  }

  // Generate filename
  const date = new Date().toISOString().split('T')[0];
  const filename = `Kora_School_Custom_Report_Y${yearFrom}-Y${yearTo}_${date}.xlsx`;

  // Write and download
  XLSX.writeFile(wb, filename);

  return filename;
};

export default exportFinancialPlanToExcel;
