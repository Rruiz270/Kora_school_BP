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

export default exportFinancialPlanToExcel;
