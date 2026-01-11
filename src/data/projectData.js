// AI School Brazil - Launch Control Data
// Updated: January 11, 2026 - REAL DATA
// Location: Hotel Federal, Maua 514, Downtown São Paulo (3,500m²)
// Launch Date: February 1, 2027
// Slogan: "A VERDADEIRA ESCOLA É A CIDADE"

export const PROJECT_DATA = {
  // Project Info
  projectInfo: {
    name: 'AI School Brazil',
    slogan: 'A Verdadeira Escola é a Cidade',
    sloganEN: 'The Real School is the City',
    location: 'Hotel Federal - Maua 514, Downtown São Paulo (3,500m²)',
    launchDate: '2027-02-01',
    buildingSize: '3,500m²',
    constructionPhases: {
      phase1: { percentage: 70, deadline: '2027-01-15', description: 'Ready for Feb 1 opening' },
      phase2: { percentage: 30, deadline: '2027-12-31', description: 'Complete remaining areas' }
    },
    nearbyLandmarks: [
      'Estação da Luz',
      'Museu da Língua Portuguesa',
      'Pinacoteca do Estado',
      'Parque da Luz',
      'Sala São Paulo',
      'SESC Centro',
      'Teatro Municipal'
    ],
    buildingHistory: 'Historic Hotel Federal - One of the first hotels of São Paulo'
  },

  // Team Members
  team: [
    // Core Leadership
    { id: 'raphael', name: 'Raphael Ruiz', role: 'CEO & Founder', areas: ['funding', 'strategy'], status: 'active' },
    { id: 'gabriel', name: 'Gabriel', role: 'COO - Operations & M&A', areas: ['funding', 'operations', 'construction'], status: 'active', expertise: 'Fund raising, M&A, Operations' },
    { id: 'odair', name: 'Odair Ribeiro', role: 'CFO - Finance', areas: ['funding', 'finance'], status: 'confirmed' },
    { id: 'eduardo', name: 'Eduardo', role: 'Bridge Financing Lead', areas: ['funding'], status: 'active', note: 'Phase 1 - Bridge financing only' },

    // Construction & Architecture
    { id: 'ciro', name: 'Ciro Pirondi', role: 'Lead Architect', areas: ['construction'], status: 'confirmed', expertise: 'Top architect in Brazil, Government connections' },
    { id: 'leonardo', name: 'Leonardo', role: 'Bureaucratic Consultant', areas: ['construction', 'regulatory'], status: 'confirmed', expertise: 'Public & Private sector liaison' },
    { id: 'ricardo', name: 'Ricardo', role: 'Building Owner', areas: ['construction'], status: 'partner' },
    { id: 'guilherme', name: 'Guilherme', role: 'Construction Company (Candidate)', areas: ['construction'], status: 'candidate' },

    // Technology - Harvard Team + Bruno
    { id: 'jay', name: 'Jay', role: 'Tech Lead - Harvard', areas: ['technology'], status: 'confirmed', equity: true },
    { id: 'ethan', name: 'Ethan', role: 'Developer - Harvard', areas: ['technology'], status: 'confirmed', equity: true },
    { id: 'camilo', name: 'Camilo', role: 'Developer - Harvard', areas: ['technology'], status: 'confirmed', equity: true },
    { id: 'bruno-almeida', name: 'Bruno Almeida', role: 'Developer & Partner', areas: ['technology'], status: 'confirmed', equity: true, proLabore: true },

    // Education & Life Skills
    { id: 'whitney', name: 'Whitney Boughton', role: 'Education & Life Skills Director', areas: ['education', 'hiring'], status: 'confirmed' },
    { id: 'fernanda', name: 'Fernanda Ruiz', role: 'People & Culture Lead', areas: ['hiring', 'education'], status: 'to-invite' },

    // Public Sector & Regulatory
    { id: 'bruno-quick', name: 'Bruno Quick', role: 'Public Sector Strategy Lead', areas: ['regulatory', 'public-sector'], status: 'confirmed', expertise: 'National Head of Sebrae' },
    { id: 'gustavo', name: 'Gustavo Vasconcelos', role: 'Public Sector Consultant', areas: ['regulatory', 'public-sector'], status: 'confirmed', expertise: 'Ministry of Education, BNCC' },
  ],

  workstreams: [
    {
      id: 'funding',
      name: 'Funding & Finance',
      color: '#10B981', // green
      leads: ['Raphael Ruiz', 'Gabriel', 'Eduardo'],
      icon: 'DollarSign',
      status: 'urgent',
      description: 'Raise $2M bridge financing before June 2026 government funds',
      tasks: [
        {
          id: 'f1',
          title: 'Raise $2M Private Bridge Financing',
          status: 'urgent',
          priority: 'critical',
          dueDate: '2026-01-31',
          assignees: ['Raphael', 'Gabriel', 'Eduardo'],
          progress: 10,
          description: 'Hybrid model: Interest (1.5%/mo) + Kicker (5%) + Equity warrants',
          subtasks: [
            { id: 'f1.1', title: 'Finalize investor pitch deck with hybrid model', completed: false },
            { id: 'f1.2', title: 'Identify 10 potential private investors', completed: false },
            { id: 'f1.3', title: 'Schedule investor meetings', completed: false },
            { id: 'f1.4', title: 'Due diligence preparation', completed: false },
            { id: 'f1.5', title: 'Term sheet negotiation', completed: false },
            { id: 'f1.6', title: 'Close first tranche ($1M)', completed: false }
          ]
        },
        {
          id: 'f2',
          title: 'Desenvolve SP - Start Application Process',
          status: 'urgent',
          priority: 'critical',
          dueDate: '2026-01-31',
          assignees: ['Gabriel', 'Leonardo'],
          progress: 5,
          description: 'Begin paperwork end of January - R$45M total (Innovation + CAPEX)',
          subtasks: [
            { id: 'f2.1', title: 'Prepare innovation project documentation', completed: false },
            { id: 'f2.2', title: 'Prepare CAPEX project documentation', completed: false },
            { id: 'f2.3', title: 'Identify guarantee options', completed: false },
            { id: 'f2.4', title: 'Submit applications to Desenvolve SP', completed: false }
          ]
        },
        {
          id: 'f3',
          title: 'Desenvolve SP - Funding Approved (R$45M)',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-05-31',
          assignees: ['Gabriel', 'Leonardo'],
          progress: 0,
          description: 'R$15M Innovation + R$30M CAPEX - worst case June',
          subtasks: [
            { id: 'f3.1', title: 'Follow up on application status', completed: false },
            { id: 'f3.2', title: 'Provide additional documentation if needed', completed: false },
            { id: 'f3.3', title: 'Final approval', completed: false },
            { id: 'f3.4', title: 'First disbursement received', completed: false }
          ]
        },
        {
          id: 'f4',
          title: 'City Hall Historic Building Incentive (25% CAPEX)',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-03-31',
          assignees: ['Ciro Pirondi', 'Leonardo'],
          progress: 0,
          description: 'R$10M incentive (25% of R$40M renovation) for historic building',
          subtasks: [
            { id: 'f4.1', title: 'Document historic building status', completed: false },
            { id: 'f4.2', title: 'Submit incentive application to City Hall', completed: false },
            { id: 'f4.3', title: 'Coordinate with heritage department', completed: false },
            { id: 'f4.4', title: 'Approval and terms confirmation', completed: false }
          ]
        },
        {
          id: 'f5',
          title: 'Repay Bridge Loan + Interest + Equity',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-06-30',
          assignees: ['Eduardo', 'Gabriel'],
          progress: 0,
          description: 'Pay back private investors when government funds arrive',
          milestone: true
        }
      ]
    },
    {
      id: 'construction',
      name: 'Construction & Infrastructure',
      color: '#F59E0B', // orange
      leads: ['Ciro Pirondi', 'Gabriel'],
      icon: 'Building2',
      status: 'active',
      description: 'Hotel Federal renovation - Historic building downtown SP',
      tasks: [
        {
          id: 'c1',
          title: 'Sign Building Contract with Ricardo',
          status: 'urgent',
          priority: 'critical',
          dueDate: '2026-01-20',
          assignees: ['Raphael', 'Gabriel', 'Ricardo'],
          progress: 70,
          description: 'Hotel Federal - Maua 514',
          subtasks: [
            { id: 'c1.1', title: 'Final contract review', completed: true },
            { id: 'c1.2', title: 'Negotiate terms', completed: true },
            { id: 'c1.3', title: 'Legal approval', completed: false },
            { id: 'c1.4', title: 'Sign contract', completed: false }
          ]
        },
        {
          id: 'c2',
          title: 'Architectural Project by Ciro Pirondi',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-02-28',
          assignees: ['Ciro Pirondi'],
          progress: 20,
          description: 'Full renovation project for historic building - FAST TRACK',
          subtasks: [
            { id: 'c2.1', title: 'Site analysis and measurements', completed: true },
            { id: 'c2.2', title: 'Concept design', completed: false },
            { id: 'c2.3', title: 'Detailed architectural plans', completed: false },
            { id: 'c2.4', title: 'Historic preservation compliance', completed: false },
            { id: 'c2.5', title: 'Submit for permit approval', completed: false }
          ]
        },
        {
          id: 'c3',
          title: 'Select Construction Company',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-02-15',
          assignees: ['Gabriel', 'Ciro Pirondi'],
          progress: 15,
          description: 'Evaluate 3 companies: Guilherme, Ricardo contact, Ciro contact',
          subtasks: [
            { id: 'c3.1', title: 'Get estimate from Guilherme company', completed: false },
            { id: 'c3.2', title: 'Get estimate from Ricardo contact', completed: false },
            { id: 'c3.3', title: 'Get estimate from Ciro contact', completed: false },
            { id: 'c3.4', title: 'Compare proposals and timelines', completed: false },
            { id: 'c3.5', title: 'Select and contract construction company', completed: false }
          ]
        },
        {
          id: 'c4',
          title: 'Government Licensing & Permits',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-03-31',
          assignees: ['Ciro Pirondi', 'Leonardo'],
          progress: 0,
          description: 'All permits via Ciro government connections - EXPEDITED',
          subtasks: [
            { id: 'c4.1', title: 'Historic building renovation permit', completed: false },
            { id: 'c4.2', title: 'Fire safety certification', completed: false },
            { id: 'c4.3', title: 'Accessibility compliance', completed: false },
            { id: 'c4.4', title: 'Environmental clearance', completed: false },
            { id: 'c4.5', title: 'Construction start permit', completed: false }
          ]
        },
        {
          id: 'c5',
          title: 'Construction START',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-03-01',
          assignees: ['Construction Company TBD', 'Gabriel'],
          progress: 0,
          description: 'Break ground early March - every day counts for Feb 2027 opening',
          milestone: true
        },
        {
          id: 'c6',
          title: 'Phase 1 Construction (70% of building)',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2027-01-15',
          assignees: ['Construction Company TBD', 'Gabriel'],
          progress: 0,
          description: 'Core 70% ready for Feb 1, 2027 opening - 2,450m² of 3,500m²',
          milestone: true,
          subtasks: [
            { id: 'c6.1', title: 'Demolition and structural work (Apr-Jun)', completed: false },
            { id: 'c6.2', title: 'Electrical and plumbing (Jul-Aug)', completed: false },
            { id: 'c6.3', title: 'Interior finishing - priority areas (Sep-Nov)', completed: false },
            { id: 'c6.4', title: 'Final details for opening spaces (Dec-Jan)', completed: false },
            { id: 'c6.5', title: 'Phase 1 inspection and handover', completed: false }
          ]
        },
        {
          id: 'c8',
          title: 'Phase 2 Construction (remaining 30%)',
          status: 'not-started',
          priority: 'high',
          dueDate: '2027-12-31',
          assignees: ['Construction Company TBD', 'Gabriel'],
          progress: 0,
          description: 'Complete remaining 1,050m² throughout 2027 while school operates',
          subtasks: [
            { id: 'c8.1', title: 'Plan Phase 2 areas to minimize disruption', completed: false },
            { id: 'c8.2', title: 'Execute remaining construction (Feb-Nov 2027)', completed: false },
            { id: 'c8.3', title: 'Final inspection and full building handover', completed: false }
          ]
        },
        {
          id: 'c7',
          title: 'Partnerships with Government Bodies',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-05-31',
          assignees: ['Ciro Pirondi', 'Leonardo'],
          progress: 0,
          description: 'Leverage Ciro connections for incentives and partnerships'
        }
      ]
    },
    {
      id: 'technology',
      name: 'Technology & Platform',
      color: '#3B82F6', // blue
      leads: ['Jay', 'Bruno Almeida'],
      icon: 'Laptop',
      status: 'active',
      description: 'AI Learning Platform - 2 hour academic learning system',
      tasks: [
        {
          id: 't1',
          title: 'Core Platform Architecture',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-02-28',
          assignees: ['Jay', 'Ethan', 'Camilo', 'Bruno Almeida'],
          progress: 25,
          description: 'AI-powered 2-hour learning system architecture',
          subtasks: [
            { id: 't1.1', title: 'System architecture design', completed: true },
            { id: 't1.2', title: 'Database schema design', completed: false },
            { id: 't1.3', title: 'AI integration strategy (GPT-4, Claude, Gemini)', completed: true },
            { id: 't1.4', title: 'Infrastructure setup (AWS/GCP)', completed: false }
          ]
        },
        {
          id: 't2',
          title: 'AI Tutoring Engine (INCEPT)',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-05-31',
          assignees: ['Jay', 'Bruno Almeida'],
          progress: 15,
          description: 'Personalized AI tutoring with mastery-based progression',
          subtasks: [
            { id: 't2.1', title: 'Multi-LLM orchestration system', completed: false },
            { id: 't2.2', title: 'Portuguese language optimization', completed: false },
            { id: 't2.3', title: 'Mastery-based progression (90%+ requirement)', completed: false },
            { id: 't2.4', title: 'Personalization engine', completed: false },
            { id: 't2.5', title: 'Real-time progress tracking', completed: false }
          ]
        },
        {
          id: 't3',
          title: 'BNCC Curriculum Integration',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-04-30',
          assignees: ['Ethan', 'Camilo'],
          progress: 0,
          description: 'Full Brazilian national curriculum mapped to AI system',
          subtasks: [
            { id: 't3.1', title: 'BNCC content mapping', completed: false },
            { id: 't3.2', title: 'Grade-level curriculum prompts', completed: false },
            { id: 't3.3', title: 'Assessment system aligned to BNCC', completed: false },
            { id: 't3.4', title: 'Content validation with educators', completed: false }
          ]
        },
        {
          id: 't4',
          title: 'Parent & Guide Portals (TIMEBACK)',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-07-31',
          assignees: ['Bruno Almeida', 'Camilo'],
          progress: 0,
          description: 'Operating system for parents and guides',
          subtasks: [
            { id: 't4.1', title: 'Parent progress monitoring dashboard', completed: false },
            { id: 't4.2', title: 'Guide intervention system', completed: false },
            { id: 't4.3', title: 'Real-time behavior analysis', completed: false },
            { id: 't4.4', title: 'Communication platform', completed: false }
          ]
        },
        {
          id: 't5',
          title: 'Platform MVP Ready for Testing',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-09-30',
          assignees: ['Jay', 'Bruno Almeida', 'Ethan', 'Camilo'],
          progress: 0,
          milestone: true,
          description: 'Complete platform ready for pilot testing'
        },
        {
          id: 't6',
          title: 'Equity & Compensation Structure for Tech Team',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2026-02-15',
          assignees: ['Raphael', 'Gabriel'],
          progress: 30,
          description: 'All Harvard team + Bruno Almeida get equity. Bruno also gets pro-labore.'
        }
      ]
    },
    {
      id: 'education',
      name: 'Life Skills & Educational Model',
      color: '#8B5CF6', // purple
      leads: ['Whitney Boughton'],
      icon: 'GraduationCap',
      status: 'active',
      description: '2-hour academics + Life Skills. Benchmark: Alpha School',
      tasks: [
        {
          id: 'e1',
          title: 'Life Skills Curriculum by Grade (BNCC + Alpha School)',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-06-30',
          assignees: ['Whitney Boughton'],
          progress: 10,
          description: 'Map Alpha School 24 life skills to Brazilian context',
          subtasks: [
            { id: 'e1.1', title: 'Research Alpha School model in detail', completed: true },
            { id: 'e1.2', title: 'Map 24 life skills to BNCC competencies', completed: false },
            { id: 'e1.3', title: 'Design grade-level life skills progression', completed: false },
            { id: 'e1.4', title: 'Create workshop formats for each skill', completed: false },
            { id: 'e1.5', title: 'Validate with Brazilian educators', completed: false }
          ]
        },
        {
          id: 'e2',
          title: 'Cultural Institution Partnerships',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-05-31',
          assignees: ['Whitney Boughton', 'Raphael'],
          progress: 0,
          description: '"A Verdadeira Escola é a Cidade" - Downtown SP partnerships',
          subtasks: [
            { id: 'e2.1', title: 'Partnership with Estação da Luz', completed: false },
            { id: 'e2.2', title: 'Partnership with Museu da Língua Portuguesa', completed: false },
            { id: 'e2.3', title: 'Partnership with Pinacoteca do Estado', completed: false },
            { id: 'e2.4', title: 'Partnership with Parque da Luz', completed: false },
            { id: 'e2.5', title: 'Partnership with Sala São Paulo', completed: false },
            { id: 'e2.6', title: 'Partnership with SESC Centro', completed: false },
            { id: 'e2.7', title: 'Partnership with Teatro Municipal', completed: false }
          ]
        },
        {
          id: 'e3',
          title: '2-Hour Academic Learning Model',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-08-31',
          assignees: ['Whitney Boughton', 'Jay'],
          progress: 0,
          description: 'AI-powered 2x learning in 2 hours daily',
          subtasks: [
            { id: 'e3.1', title: 'Design daily 2-hour academic schedule', completed: false },
            { id: 'e3.2', title: 'Integration with AI tutoring platform', completed: false },
            { id: 'e3.3', title: 'Assessment and progress tracking', completed: false },
            { id: 'e3.4', title: 'Guide intervention protocols', completed: false }
          ]
        },
        {
          id: 'e4',
          title: 'Recruit Local Education Partners',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-04-30',
          assignees: ['Whitney Boughton'],
          progress: 0,
          description: 'Best educators from public AND private schools',
          subtasks: [
            { id: 'e4.1', title: 'Identify top public school educators', completed: false },
            { id: 'e4.2', title: 'Identify top private school educators', completed: false },
            { id: 'e4.3', title: 'Conduct interviews and assessments', completed: false },
            { id: 'e4.4', title: 'Build advisory council', completed: false }
          ]
        },
        {
          id: 'e5',
          title: 'Life Skills Specialists Hiring',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-08-31',
          assignees: ['Whitney Boughton', 'Fernanda Ruiz'],
          progress: 0,
          description: 'Sports coaches, arts instructors, makers, chefs, musicians',
          subtasks: [
            { id: 'e5.1', title: 'Sports coaches (5)', completed: false },
            { id: 'e5.2', title: 'Arts instructors (3)', completed: false },
            { id: 'e5.3', title: 'Engineering/Maker specialists (2)', completed: false },
            { id: 'e5.4', title: 'Cooking chef (2)', completed: false },
            { id: 'e5.5', title: 'Music teachers (2)', completed: false }
          ]
        }
      ]
    },
    {
      id: 'people',
      name: 'People & Culture',
      color: '#EC4899', // pink
      leads: ['Whitney Boughton', 'Fernanda Ruiz'],
      icon: 'Users',
      status: 'planning',
      description: 'No standard HR - DNA-driven hiring. Values > Skills',
      tasks: [
        {
          id: 'p1',
          title: 'Invite Fernanda Ruiz to Lead People & Culture',
          status: 'urgent',
          priority: 'critical',
          dueDate: '2026-01-20',
          assignees: ['Raphael'],
          progress: 0,
          description: 'Life skills, hiring, people engagement'
        },
        {
          id: 'p2',
          title: 'Define AI School DNA & Values',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-02-15',
          assignees: ['Whitney Boughton', 'Fernanda Ruiz', 'Raphael'],
          progress: 20,
          description: 'Core beliefs that every hire must embody',
          subtasks: [
            { id: 'p2.1', title: 'Define core values and mission', completed: true },
            { id: 'p2.2', title: 'Create hiring criteria based on values', completed: false },
            { id: 'p2.3', title: 'Design culture assessment process', completed: false },
            { id: 'p2.4', title: 'Document DNA for onboarding', completed: false }
          ]
        },
        {
          id: 'p3',
          title: 'KPI Framework: Future Skills',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-03-31',
          assignees: ['Whitney Boughton', 'Fernanda Ruiz'],
          progress: 0,
          description: 'Measure performance, creativity, charisma, grit',
          subtasks: [
            { id: 'p3.1', title: 'Define measurable future skills KPIs', completed: false },
            { id: 'p3.2', title: 'Create assessment tools', completed: false },
            { id: 'p3.3', title: 'Build employee engagement system', completed: false },
            { id: 'p3.4', title: 'Design recognition and growth paths', completed: false }
          ]
        },
        {
          id: 'p4',
          title: 'Hire AI Guides (50)',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-09-30',
          assignees: ['Whitney Boughton', 'Fernanda Ruiz'],
          progress: 0,
          description: 'Not teachers - GUIDES. Sports/performance backgrounds preferred.',
          subtasks: [
            { id: 'p4.1', title: 'Create Guide role description', completed: false },
            { id: 'p4.2', title: 'Recruitment campaign launch', completed: false },
            { id: 'p4.3', title: 'Interview and assess 150+ candidates', completed: false },
            { id: 'p4.4', title: 'Select and hire 50 guides', completed: false },
            { id: 'p4.5', title: 'R$100k+ compensation packages', completed: false }
          ]
        },
        {
          id: 'p5',
          title: 'Guide Training Program',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-12-15',
          assignees: ['Whitney Boughton'],
          progress: 0,
          description: 'Daily 1-on-1 protocols, motivation, high standards',
          milestone: true,
          subtasks: [
            { id: 'p5.1', title: 'Design training curriculum', completed: false },
            { id: 'p5.2', title: 'AI platform training', completed: false },
            { id: 'p5.3', title: 'Life skills facilitation training', completed: false },
            { id: 'p5.4', title: 'Culture and DNA immersion', completed: false },
            { id: 'p5.5', title: 'Certification and readiness assessment', completed: false }
          ]
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Enrollment',
      color: '#EF4444', // red
      leads: ['TBD - DNA Hire'],
      icon: 'Megaphone',
      status: 'planning',
      description: '8% of revenue. Downtown = Democratization. Historic Building Story.',
      tasks: [
        {
          id: 'm1',
          title: 'Brand Identity & Messaging',
          status: 'in-progress',
          priority: 'critical',
          dueDate: '2026-02-28',
          assignees: ['Raphael'],
          progress: 30,
          description: '"A Verdadeira Escola é a Cidade" - Downtown democratization',
          subtasks: [
            { id: 'm1.1', title: 'Finalize school name and brand', completed: false },
            { id: 'm1.2', title: 'Logo and visual identity design', completed: false },
            { id: 'm1.3', title: 'Brand guidelines document', completed: false },
            { id: 'm1.4', title: 'Key messaging: Downtown democratization', completed: true },
            { id: 'm1.5', title: 'Historic Hotel Federal story', completed: true }
          ]
        },
        {
          id: 'm2',
          title: 'Marketing Website Launch',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-03-31',
          assignees: ['TBD'],
          progress: 0,
          description: 'Enrollment-focused website with brand story',
          subtasks: [
            { id: 'm2.1', title: 'Website design and development', completed: false },
            { id: 'm2.2', title: 'Enrollment inquiry system', completed: false },
            { id: 'm2.3', title: 'Content creation and SEO', completed: false },
            { id: 'm2.4', title: 'Launch and optimize', completed: false }
          ]
        },
        {
          id: 'm3',
          title: 'Pre-Enrollment Campaign',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-06-30',
          assignees: ['Whitney Boughton', 'TBD Marketing'],
          progress: 0,
          description: 'Target: 200+ pre-enrollments with deposits',
          milestone: true,
          subtasks: [
            { id: 'm3.1', title: 'Define target family profiles', completed: false },
            { id: 'm3.2', title: 'Digital marketing campaign', completed: false },
            { id: 'm3.3', title: 'Information sessions and webinars', completed: false },
            { id: 'm3.4', title: 'Campus preview events (construction site)', completed: false },
            { id: 'm3.5', title: 'Collect 200+ deposits (R$1,000+)', completed: false }
          ]
        },
        {
          id: 'm4',
          title: 'Campus Tours & Open House',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-10-15',
          assignees: ['TBD'],
          progress: 0,
          description: 'Show the finished campus to enrolled and prospective families',
          milestone: true
        },
        {
          id: 'm5',
          title: 'Achieve 750 Year 1 Enrollments',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-12-31',
          assignees: ['TBD Marketing', 'Whitney Boughton'],
          progress: 0,
          milestone: true,
          kpi: { target: 750, current: 0, unit: 'students' },
          description: 'R$2,500/month tuition - Premium but accessible'
        }
      ]
    },
    {
      id: 'regulatory',
      name: 'Regulatory & Compliance',
      color: '#6B7280', // gray
      leads: ['Leonardo', 'Bruno Quick', 'Gustavo Vasconcelos'],
      icon: 'Shield',
      status: 'planning',
      description: 'Building permits (Ricardo), Education compliance (Bruno Quick/Gustavo)',
      tasks: [
        {
          id: 'r1',
          title: 'Building Regulatory (Historic Preservation)',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-03-31',
          assignees: ['Ricardo', 'Ciro Pirondi', 'Leonardo'],
          progress: 0,
          description: 'Historic building compliance and permits - EXPEDITED via Ciro',
          subtasks: [
            { id: 'r1.1', title: 'Historic preservation documentation', completed: false },
            { id: 'r1.2', title: 'Renovation approval from heritage dept', completed: false },
            { id: 'r1.3', title: 'Fire and safety certifications', completed: false },
            { id: 'r1.4', title: 'Occupancy permits', completed: false }
          ]
        },
        {
          id: 'r2',
          title: 'BNCC Educational Compliance',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-08-31',
          assignees: ['Bruno Quick', 'Gustavo Vasconcelos'],
          progress: 0,
          description: 'Ministry of Education and BNCC alignment',
          subtasks: [
            { id: 'r2.1', title: 'Prepare curriculum documentation', completed: false },
            { id: 'r2.2', title: 'Submit to Ministry of Education', completed: false },
            { id: 'r2.3', title: 'BNCC compliance certification', completed: false },
            { id: 'r2.4', title: 'School license approval', completed: false }
          ]
        },
        {
          id: 'r3',
          title: 'Legal Team Setup',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-02-28',
          assignees: ['Leonardo', 'Gabriel'],
          progress: 0,
          description: 'Contracts, corporate structure, compliance'
        },
        {
          id: 'r4',
          title: 'Municipal Education License',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-10-31',
          assignees: ['Bruno Quick', 'Gustavo Vasconcelos'],
          progress: 0,
          milestone: true,
          description: 'Final approval to operate as K-12 school'
        }
      ]
    },
    {
      id: 'operations',
      name: 'Operations Setup',
      color: '#14B8A6', // teal
      leads: ['Gabriel'],
      icon: 'Settings',
      status: 'planning',
      description: 'Gabriel oversees all workstreams execution',
      tasks: [
        {
          id: 'o1',
          title: 'Technology Infrastructure Installation',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2026-11-15',
          assignees: ['Gabriel', 'Jay'],
          progress: 0,
          description: 'Network, devices, security systems - After construction complete',
          subtasks: [
            { id: 'o1.1', title: 'High-speed network installation', completed: false },
            { id: 'o1.2', title: 'Computer lab and device setup', completed: false },
            { id: 'o1.3', title: 'Security and access systems', completed: false },
            { id: 'o1.4', title: 'Student device procurement', completed: false }
          ]
        },
        {
          id: 'o2',
          title: 'Furniture & Equipment',
          status: 'not-started',
          priority: 'high',
          dueDate: '2026-12-15',
          assignees: ['Gabriel'],
          progress: 0,
          description: 'Classrooms, life skills spaces, common areas'
        },
        {
          id: 'o3',
          title: 'Food Service Setup',
          status: 'not-started',
          priority: 'medium',
          dueDate: '2026-12-20',
          assignees: ['Gabriel'],
          progress: 0,
          description: 'Kitchen, dining, nutrition program'
        },
        {
          id: 'o4',
          title: 'Transportation Planning',
          status: 'not-started',
          priority: 'medium',
          dueDate: '2026-12-01',
          assignees: ['Gabriel'],
          progress: 0,
          description: 'Downtown location - public transport integration'
        },
        {
          id: 'o5',
          title: 'Operational Readiness Check',
          status: 'not-started',
          priority: 'critical',
          dueDate: '2027-01-20',
          assignees: ['Gabriel'],
          progress: 0,
          milestone: true,
          description: 'All systems go for February 1 launch'
        }
      ]
    },
  ],

  milestones: [
    { id: 'm1', title: 'Building Contract Signed (Hotel Federal)', date: '2026-01-17', status: 'pending', critical: true, owner: 'Raphael, Gabriel' },
    { id: 'm2', title: 'Private Bridge Financing Closed ($2M)', date: '2026-01-31', status: 'pending', critical: true, owner: 'Raphael, Gabriel, Eduardo' },
    { id: 'm3', title: 'Construction Company Selected', date: '2026-02-15', status: 'pending', critical: true, owner: 'Gabriel' },
    { id: 'm4', title: 'Architect Project Complete (Ciro Pirondi)', date: '2026-02-28', status: 'pending', critical: true, owner: 'Ciro Pirondi' },
    { id: 'm5', title: 'All Permits Approved', date: '2026-03-31', status: 'pending', critical: true, owner: 'Ciro Pirondi, Leonardo' },
    { id: 'm6', title: 'City Hall Incentive Approved (R$10M)', date: '2026-03-31', status: 'pending', critical: false, owner: 'Ciro Pirondi' },
    { id: 'm7', title: 'CONSTRUCTION STARTS', date: '2026-03-01', status: 'pending', critical: true, owner: 'Gabriel, Construction Co' },
    { id: 'm8', title: 'Cultural Institution Partnerships Signed', date: '2026-05-31', status: 'pending', critical: false, owner: 'Whitney Boughton' },
    { id: 'm9', title: 'Desenvolve SP Funding Approved (R$45M)', date: '2026-05-31', status: 'pending', critical: true, owner: 'Gabriel, Leonardo' },
    { id: 'm10', title: '200+ Pre-Enrollments with Deposits', date: '2026-06-30', status: 'pending', critical: true, owner: 'Marketing' },
    { id: 'm11', title: 'Bridge Loan Repaid with Interest + Equity', date: '2026-06-30', status: 'pending', critical: true, owner: 'Eduardo' },
    { id: 'm12', title: 'Technology Platform MVP Ready', date: '2026-09-30', status: 'pending', critical: true, owner: 'Jay, Bruno Almeida' },
    { id: 'm13', title: '50 AI Guides Hired', date: '2026-09-30', status: 'pending', critical: true, owner: 'Whitney, Fernanda' },
    { id: 'm14', title: 'PHASE 1 CONSTRUCTION COMPLETE (70%)', date: '2027-01-15', status: 'pending', critical: true, owner: 'Gabriel, Construction Co' },
    { id: 'm15', title: 'BNCC Educational License Approved', date: '2026-10-31', status: 'pending', critical: true, owner: 'Bruno Quick, Gustavo' },
    { id: 'm16', title: 'Tech Infrastructure Installed', date: '2026-11-15', status: 'pending', critical: true, owner: 'Gabriel, Jay' },
    { id: 'm17', title: 'Guide Training Complete', date: '2026-12-15', status: 'pending', critical: true, owner: 'Whitney Boughton' },
    { id: 'm18', title: '750 Students Enrolled', date: '2026-12-31', status: 'pending', critical: true, owner: 'Marketing' },
    { id: 'm19', title: 'Operational Readiness Check', date: '2027-01-20', status: 'pending', critical: true, owner: 'Gabriel' },
    { id: 'm20', title: 'AI SCHOOL BRAZIL OPENS!', date: '2027-02-01', status: 'pending', critical: true, owner: 'Everyone' },
    { id: 'm21', title: 'PHASE 2 CONSTRUCTION COMPLETE (100%)', date: '2027-12-31', status: 'pending', critical: false, owner: 'Gabriel, Construction Co' },
  ],

  risks: [
    {
      id: 'risk1',
      title: 'Bridge Financing Not Closed in Time',
      probability: 'medium',
      impact: 'critical',
      mitigation: 'Hybrid model (interest + kicker + equity) makes it attractive. Multiple investor conversations in parallel.',
      owner: 'Raphael, Gabriel'
    },
    {
      id: 'risk2',
      title: 'Building Contract Delays',
      probability: 'low',
      impact: 'critical',
      mitigation: 'Good relationship with Ricardo. Contract 70% ready.',
      owner: 'Gabriel'
    },
    {
      id: 'risk3',
      title: 'Historic Building Permit Delays',
      probability: 'medium',
      impact: 'high',
      mitigation: 'Ciro Pirondi government connections. City Hall incentive aligned.',
      owner: 'Ciro Pirondi, Leonardo'
    },
    {
      id: 'risk4',
      title: 'Desenvolve SP Funding Delayed',
      probability: 'medium',
      impact: 'critical',
      mitigation: 'Bridge financing provides runway. Multiple credit lines in parallel.',
      owner: 'Gabriel, Leonardo'
    },
    {
      id: 'risk5',
      title: 'Technology Platform Not Ready',
      probability: 'low',
      impact: 'critical',
      mitigation: 'Strong Harvard team + Bruno Almeida. AI tools accelerating development.',
      owner: 'Jay, Bruno Almeida'
    },
    {
      id: 'risk6',
      title: 'Construction Delays',
      probability: 'medium',
      impact: 'high',
      mitigation: '3 construction company quotes. Buffer time in schedule. Gabriel oversight.',
      owner: 'Gabriel'
    },
    {
      id: 'risk7',
      title: 'Low Pre-Enrollment Interest',
      probability: 'medium',
      impact: 'high',
      mitigation: 'Downtown location = differentiation. "A Verdadeira Escola é a Cidade" messaging.',
      owner: 'Marketing'
    },
    {
      id: 'risk8',
      title: 'BNCC Educational License Rejection',
      probability: 'low',
      impact: 'critical',
      mitigation: 'Bruno Quick (Sebrae head) + Gustavo connections to Ministry of Education.',
      owner: 'Bruno Quick, Gustavo'
    },
    {
      id: 'risk9',
      title: 'Key Team Member Departure',
      probability: 'low',
      impact: 'high',
      mitigation: 'Equity for tech team. Strong culture and mission. Competitive compensation.',
      owner: 'Raphael'
    }
  ],

  kpis: [
    { id: 'kpi1', name: 'Bridge Financing Raised', current: 0, target: 2000000, unit: 'USD', description: 'Private capital before June 2026' },
    { id: 'kpi2', name: 'Government Funding Secured', current: 0, target: 55000000, unit: 'R$', description: 'Desenvolve SP (R$45M) + City Hall (R$10M)' },
    { id: 'kpi3', name: 'Pre-Enrollments', current: 0, target: 200, unit: 'families', description: 'Deposits collected before construction complete' },
    { id: 'kpi4', name: 'Year 1 Students Enrolled', current: 0, target: 750, unit: 'students', description: 'Full enrollment for February 2027 launch' },
    { id: 'kpi5', name: 'AI Guides Hired', current: 0, target: 50, unit: 'guides', description: 'DNA-aligned guides hired and trained' },
    { id: 'kpi6', name: 'Phase 1 Construction Progress', current: 0, target: 70, unit: '%', description: 'Hotel Federal - 70% (2,450m²) ready for Feb 2027 opening' },
    { id: 'kpi7', name: 'Platform Development', current: 20, target: 100, unit: '%', description: 'AI tutoring + BNCC integration' },
    { id: 'kpi8', name: 'Cultural Partnerships', current: 0, target: 7, unit: 'partnerships', description: 'Downtown SP institutions' },
    { id: 'kpi9', name: 'Days to Launch', current: 386, target: 0, unit: 'days', description: 'Countdown to February 1, 2027' }
  ],

  // Funding Summary
  fundingSummary: {
    bridgeFinancing: {
      target: 2000000,
      currency: 'USD',
      deadline: '2026-01-31',
      structure: 'Interest (1.5%/mo) + Kicker (5%) + Equity Warrants',
      leads: ['Raphael', 'Gabriel', 'Eduardo']
    },
    governmentFunding: {
      desenvolveSpInnovation: { amount: 15000000, currency: 'R$', deadline: '2026-06-15' },
      desenvolveSpCapex: { amount: 30000000, currency: 'R$', deadline: '2026-06-15' },
      cityHallIncentive: { amount: 10000000, currency: 'R$', deadline: '2026-03-31', note: '25% of CAPEX for historic building' }
    },
    totalGovernment: 55000000
  }
};

// Helper functions
export const getTasksByStatus = (status) => {
  const tasks = [];
  PROJECT_DATA.workstreams.forEach(workstream => {
    workstream.tasks.forEach(task => {
      if (task.status === status) {
        tasks.push({ ...task, workstreamId: workstream.id, workstreamName: workstream.name, workstreamColor: workstream.color });
      }
    });
  });
  return tasks;
};

export const getUpcomingDeadlines = (days = 30) => {
  const tasks = [];
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

  PROJECT_DATA.workstreams.forEach(workstream => {
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

export const calculateOverallProgress = () => {
  let totalTasks = 0;
  let totalProgress = 0;

  PROJECT_DATA.workstreams.forEach(workstream => {
    workstream.tasks.forEach(task => {
      totalTasks++;
      totalProgress += task.progress;
    });
  });

  return totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;
};

export const getTeamMember = (id) => {
  return PROJECT_DATA.team.find(member => member.id === id);
};

export const getTeamByArea = (area) => {
  return PROJECT_DATA.team.filter(member => member.areas.includes(area));
};
