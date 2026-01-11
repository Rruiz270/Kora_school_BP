import React, { useState } from 'react';
import {
  Calendar, Clock, CheckCircle, AlertCircle,
  School, Building2, GitMerge, Filter,
  Users, TrendingUp, Target, DollarSign,
  Laptop, GraduationCap
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const MasterTimeline = () => {
  const { projectData } = useProject();
  const [selectedYear, setSelectedYear] = useState('2026');

  // Real timeline data based on project milestones
  const masterTimelineData = {
    2026: {
      quarter: {
        Q1: [
          {
            id: 'building-contract',
            title: 'Building Contract Signed (Hotel Federal)',
            category: 'construction',
            status: 'pending',
            critical: true,
            date: 'Jan 17',
            description: 'Sign contract for Hotel Federal - Maua 514, Downtown São Paulo (3,500m²)'
          },
          {
            id: 'bridge-financing',
            title: 'Private Bridge Financing Closed ($2M)',
            category: 'funding',
            status: 'pending',
            critical: true,
            date: 'Jan 31',
            description: 'Hybrid model: Interest (1.5%/mo) + Kicker (5%) + Equity warrants'
          },
          {
            id: 'construction-company',
            title: 'Construction Company Selected',
            category: 'construction',
            status: 'pending',
            critical: true,
            date: 'Feb 15',
            description: 'Evaluate 3 companies: Guilherme, Ricardo contact, Ciro contact'
          },
          {
            id: 'architect-complete',
            title: 'Architect Project Complete (Ciro Pirondi)',
            category: 'construction',
            status: 'pending',
            critical: true,
            date: 'Feb 28',
            description: 'Full renovation project for historic building - FAST TRACK'
          },
          {
            id: 'desenvolve-sp-start',
            title: 'Desenvolve SP - Start Application',
            category: 'funding',
            status: 'urgent',
            critical: true,
            date: 'Jan 31',
            description: 'Begin paperwork for R$45M (Innovation + CAPEX) - every day counts'
          },
          {
            id: 'construction-start',
            title: 'CONSTRUCTION STARTS',
            category: 'construction',
            status: 'pending',
            critical: true,
            date: 'Mar 1',
            description: 'Break ground early March - 11 months to Feb 2027 opening'
          },
          {
            id: 'permits-approved',
            title: 'All Permits Approved',
            category: 'regulatory',
            status: 'pending',
            critical: true,
            date: 'Mar 31',
            description: 'Historic building permits via Ciro Pirondi government connections'
          },
          {
            id: 'city-hall-incentive',
            title: 'City Hall Incentive Approved (R$10M)',
            category: 'funding',
            status: 'pending',
            critical: false,
            date: 'Mar 31',
            description: '25% of CAPEX for historic building renovation'
          }
        ],
        Q2: [
          {
            id: 'desenvolve-sp-approved',
            title: 'Desenvolve SP Funding Approved (R$45M)',
            category: 'funding',
            status: 'pending',
            critical: true,
            date: 'May 31',
            description: 'R$15M Innovation + R$30M CAPEX - worst case June'
          },
          {
            id: 'pre-enrollments',
            title: '200+ Pre-Enrollments with Deposits',
            category: 'marketing',
            status: 'pending',
            critical: true,
            date: 'Jun 30',
            description: 'Target families with R$1,000+ deposits'
          },
          {
            id: 'bridge-repaid',
            title: 'Bridge Loan Repaid with Interest + Equity',
            category: 'funding',
            status: 'pending',
            critical: true,
            date: 'Jun 30',
            description: 'Pay back private investors when government funds arrive'
          },
          {
            id: 'cultural-partnerships',
            title: 'Cultural Institution Partnerships Signed',
            category: 'education',
            status: 'pending',
            critical: false,
            date: 'May 31',
            description: '"A Verdadeira Escola é a Cidade" - 7 downtown SP partners'
          }
        ],
        Q3: [
          {
            id: 'platform-mvp',
            title: 'Technology Platform MVP Ready',
            category: 'technology',
            status: 'pending',
            critical: true,
            date: 'Sep 30',
            description: 'INCEPT AI tutoring + BNCC integration complete'
          },
          {
            id: 'guides-hired',
            title: '50 AI Guides Hired',
            category: 'people',
            status: 'pending',
            critical: true,
            date: 'Sep 30',
            description: 'DNA-aligned guides hired - sports/performance backgrounds'
          }
        ],
        Q4: [
          {
            id: 'bncc-license',
            title: 'BNCC Educational License Approved',
            category: 'regulatory',
            status: 'pending',
            critical: true,
            date: 'Oct 31',
            description: 'Ministry of Education approval to operate K-12'
          },
          {
            id: 'tech-infrastructure',
            title: 'Tech Infrastructure Installed',
            category: 'technology',
            status: 'pending',
            critical: true,
            date: 'Nov 15',
            description: 'Network, devices, security systems in place'
          },
          {
            id: 'guide-training',
            title: 'Guide Training Complete',
            category: 'people',
            status: 'pending',
            critical: true,
            date: 'Dec 15',
            description: 'All 50 guides trained on AI platform and life skills'
          },
          {
            id: 'enrollment-750',
            title: '750 Students Enrolled',
            category: 'marketing',
            status: 'pending',
            critical: true,
            date: 'Dec 31',
            description: 'Full Year 1 enrollment at R$2,500/month'
          }
        ]
      },
      metrics: {
        funding: { bridge: 2000000, government: 55000000, currency: 'R$' },
        students: { target: 750, enrolled: 0 },
        construction: { phase1: 70, phase2: 30 }
      }
    },

    2027: {
      quarter: {
        Q1: [
          {
            id: 'phase1-complete',
            title: 'PHASE 1 CONSTRUCTION COMPLETE (70%)',
            category: 'construction',
            status: 'pending',
            critical: true,
            date: 'Jan 15',
            description: '2,450m² of 3,500m² ready for opening'
          },
          {
            id: 'operational-readiness',
            title: 'Operational Readiness Check',
            category: 'operations',
            status: 'pending',
            critical: true,
            date: 'Jan 20',
            description: 'All systems go for February 1 launch'
          },
          {
            id: 'school-opens',
            title: 'AI SCHOOL BRAZIL OPENS!',
            category: 'milestone',
            status: 'pending',
            critical: true,
            date: 'Feb 1',
            description: 'Flagship school operational - 2x learning in 2 hours model'
          }
        ],
        Q2: [
          {
            id: 'first-results',
            title: 'First Learning Outcome Results',
            category: 'education',
            status: 'pending',
            critical: false,
            date: 'Apr',
            description: 'Demonstrate 2x learning speed with Brazilian students'
          },
          {
            id: 'phase2-progress',
            title: 'Phase 2 Construction Progress',
            category: 'construction',
            status: 'pending',
            critical: false,
            date: 'Jun',
            description: 'Continue remaining 30% while school operates'
          }
        ],
        Q3: [
          {
            id: 'platform-optimization',
            title: 'Platform Optimization Based on Feedback',
            category: 'technology',
            status: 'pending',
            critical: false,
            date: 'Sep',
            description: 'Improve AI tutoring based on real student data'
          }
        ],
        Q4: [
          {
            id: 'phase2-complete',
            title: 'PHASE 2 CONSTRUCTION COMPLETE (100%)',
            category: 'construction',
            status: 'pending',
            critical: false,
            date: 'Dec 31',
            description: 'Full 3,500m² building complete'
          },
          {
            id: 'year2-enrollment',
            title: 'Year 2 Enrollment Target Set',
            category: 'marketing',
            status: 'pending',
            critical: false,
            date: 'Dec',
            description: 'Plan for 1,500 students in Year 2'
          }
        ]
      },
      metrics: {
        students: { target: 750, enrolled: 750 },
        revenue: 22500000,
        construction: { phase1: 100, phase2: 100 }
      }
    },

    2028: {
      quarter: {
        Q1: [
          {
            id: 'year1-review',
            title: 'Year 1 Performance Review',
            category: 'operations',
            status: 'pending',
            critical: false,
            date: 'Jan',
            description: 'Analyze first year outcomes and student satisfaction'
          }
        ],
        Q2: [
          {
            id: 'expansion-planning',
            title: 'Expansion Planning Begins',
            category: 'strategy',
            status: 'pending',
            critical: false,
            date: 'Apr',
            description: 'Evaluate franchise or second campus options'
          }
        ],
        Q3: [
          {
            id: 'year2-full-capacity',
            title: '1,500 Students (Full Capacity)',
            category: 'marketing',
            status: 'pending',
            critical: true,
            date: 'Aug',
            description: 'Flagship school at maximum enrollment'
          }
        ],
        Q4: [
          {
            id: 'series-a-prep',
            title: 'Series A Preparation',
            category: 'funding',
            status: 'pending',
            critical: false,
            date: 'Dec',
            description: 'Prepare for growth capital raise'
          }
        ]
      },
      metrics: {
        students: { target: 1500, enrolled: 0 },
        revenue: 45000000
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'funding': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'construction': return <Building2 className="w-5 h-5 text-orange-600" />;
      case 'technology': return <Laptop className="w-5 h-5 text-blue-600" />;
      case 'education': return <GraduationCap className="w-5 h-5 text-purple-600" />;
      case 'people': return <Users className="w-5 h-5 text-pink-600" />;
      case 'marketing': return <Target className="w-5 h-5 text-red-600" />;
      case 'regulatory': return <CheckCircle className="w-5 h-5 text-gray-600" />;
      case 'operations': return <GitMerge className="w-5 h-5 text-teal-600" />;
      case 'strategy': return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case 'milestone': return <School className="w-5 h-5 text-yellow-600" />;
      default: return <Target className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return <div className="w-5 h-5 rounded-full bg-gray-300"></div>;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'funding': return 'border-green-200 bg-green-50';
      case 'construction': return 'border-orange-200 bg-orange-50';
      case 'technology': return 'border-blue-200 bg-blue-50';
      case 'education': return 'border-purple-200 bg-purple-50';
      case 'people': return 'border-pink-200 bg-pink-50';
      case 'marketing': return 'border-red-200 bg-red-50';
      case 'regulatory': return 'border-gray-200 bg-gray-50';
      case 'operations': return 'border-teal-200 bg-teal-50';
      case 'strategy': return 'border-indigo-200 bg-indigo-50';
      case 'milestone': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
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

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const yearData = masterTimelineData[selectedYear];

  // Calculate days until launch
  const launchDate = new Date('2027-02-01');
  const today = new Date();
  const daysUntilLaunch = Math.ceil((launchDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Master Timeline</h2>
            <p className="mt-2 opacity-90">
              AI School Brazil - Hotel Federal, Downtown São Paulo
            </p>
            <p className="text-sm opacity-75 mt-1">
              "A Verdadeira Escola é a Cidade"
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{daysUntilLaunch}</div>
            <div className="text-sm opacity-90">Days to Launch</div>
            <div className="text-lg font-semibold mt-1">Feb 1, 2027</div>
          </div>
        </div>
      </div>

      {/* Year Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Select Year:</span>
            <div className="flex space-x-2">
              {['2026', '2027', '2028'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                  {year === '2027' && <span className="ml-1 text-xs">(Launch)</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Year Metrics */}
      {yearData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedYear === '2026' && (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bridge Financing Target</p>
                    <p className="text-2xl font-bold text-green-600">$2M USD</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Due: January 31, 2026
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Government Funding</p>
                    <p className="text-2xl font-bold text-blue-600">R$55M</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Desenvolve SP (R$45M) + City Hall (R$10M)
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enrollment Target</p>
                    <p className="text-2xl font-bold text-purple-600">750 Students</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Year 1 @ R$2,500/month
                </div>
              </div>
            </>
          )}
          {selectedYear === '2027' && (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Year 1 Revenue</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(22500000)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  750 students x R$2,500 x 12 months
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Building Completion</p>
                    <p className="text-2xl font-bold text-orange-600">3,500m²</p>
                  </div>
                  <Building2 className="w-8 h-8 text-orange-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Phase 1: 70% Jan | Phase 2: 30% Dec
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-purple-600">750</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  First cohort - AI-powered learning
                </div>
              </div>
            </>
          )}
          {selectedYear === '2028' && (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Year 2 Revenue Target</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(45000000)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  1,500 students at full capacity
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Student Target</p>
                    <p className="text-2xl font-bold text-purple-600">1,500</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Full building capacity
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expansion Phase</p>
                    <p className="text-2xl font-bold text-blue-600">Series A</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Growth capital for scaling
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Quarterly Timeline */}
      {yearData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{selectedYear} Timeline</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
              <div key={quarter} className="space-y-4">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900">{quarter} {selectedYear}</h4>
                  <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                    <div
                      className={`h-1 rounded-full ${
                        selectedYear === '2026' ? 'bg-blue-500' :
                        selectedYear === '2027' ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {(yearData.quarter[quarter] || []).map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`border rounded-lg p-4 ${getCategoryColor(milestone.category)} ${
                        milestone.critical ? 'border-l-4 border-l-red-400' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(milestone.status)}
                          {getCategoryIcon(milestone.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 text-sm leading-tight">
                            {milestone.title}
                            {milestone.critical && <span className="text-red-500 ml-1">*</span>}
                          </h5>
                          <p className="text-xs text-blue-600 font-medium mt-0.5">
                            {milestone.date}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 leading-tight">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!yearData.quarter[quarter] || yearData.quarter[quarter].length === 0) && (
                    <div className="text-center text-gray-400 py-4">
                      <Calendar className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No milestones in {quarter}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Phases Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Target className="w-6 h-6 text-blue-600 mt-0.5" />
          <div className="w-full">
            <h4 className="font-semibold text-gray-900 mb-3">Project Phases Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="font-medium text-blue-900">Phase 1: Foundation (2026)</div>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Bridge financing ($2M) - Jan 31</li>
                  <li>• Desenvolve SP application - Jan 31</li>
                  <li>• <strong>Construction starts - Mar 1</strong></li>
                  <li>• Permits approved - Mar 31</li>
                  <li>• Government funding (R$45M) - May/Jun</li>
                  <li>• Platform MVP ready - Sep</li>
                  <li>• 750 enrollments - Dec</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="font-medium text-green-900">Phase 2: Launch (2027)</div>
                <ul className="text-sm text-green-800 mt-2 space-y-1">
                  <li>• Phase 1 construction (70%) - Jan 15</li>
                  <li>• <strong>School Opens - Feb 1</strong></li>
                  <li>• First learning outcomes - Q2</li>
                  <li>• Phase 2 construction (30%) - Dec</li>
                  <li>• Year 1 revenue: R$22.5M</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="font-medium text-purple-900">Phase 3: Growth (2028+)</div>
                <ul className="text-sm text-purple-800 mt-2 space-y-1">
                  <li>• Year 2: 1,500 students</li>
                  <li>• Revenue: R$45M</li>
                  <li>• Expansion planning</li>
                  <li>• Series A preparation</li>
                  <li>• Franchise model evaluation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Path Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <span className="font-medium text-red-900">Critical Path Items</span>
            <span className="text-red-700 text-sm ml-2">
              Items marked with <span className="text-red-500">*</span> are on the critical path and cannot be delayed without impacting the Feb 1, 2027 launch.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTimeline;
