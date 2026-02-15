const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock AI Agents Data
const agents = [
  {
    id: 'agent-001',
    name: 'CodeMaster Pro',
    vendor: 'DevTools Inc.',
    category: 'Development',
    description: 'Advanced code generation and refactoring assistant with multi-language support. Handles complex architectural decisions.',
    price: 49.99,
    rating: 4.8,
    reviews: 342,
    icon: '⚡',
    featured: true,
    tags: ['code-generation', 'refactoring', 'architecture'],
    stats: { deployments: 12500, uptime: 99.9 }
  },
  {
    id: 'agent-002',
    name: 'DataFlow Analytics',
    vendor: 'DataScience Pro',
    category: 'Data',
    description: 'Real-time data processing and visualization agent. Transforms raw data into actionable insights with auto-generated dashboards.',
    price: 79.99,
    rating: 4.9,
    reviews: 256,
    icon: '📊',
    featured: true,
    tags: ['analytics', 'visualization', 'dashboards'],
    stats: { deployments: 8900, uptime: 99.8 }
  },
  {
    id: 'agent-003',
    name: 'ContentBot Writer',
    vendor: 'Creative AI Labs',
    category: 'Creative',
    description: 'AI-powered content creation for blogs, social media, and marketing. Generates engaging copy in 20+ languages.',
    price: 0,
    rating: 4.5,
    reviews: 1203,
    icon: '✍️',
    featured: false,
    tags: ['content', 'writing', 'marketing'],
    stats: { deployments: 45000, uptime: 99.5 }
  },
  {
    id: 'agent-004',
    name: 'SecureWatch Sentinel',
    vendor: 'CyberDefense Corp',
    category: 'Security',
    description: '24/7 security monitoring and threat detection. Identifies vulnerabilities and provides real-time alerts.',
    price: 129.99,
    rating: 4.9,
    reviews: 189,
    icon: '🛡️',
    featured: true,
    tags: ['security', 'monitoring', 'threat-detection'],
    stats: { deployments: 5600, uptime: 99.99 }
  },
  {
    id: 'agent-005',
    name: 'TaskMaster Assistant',
    vendor: 'Productivity Plus',
    category: 'Productivity',
    description: 'Intelligent task automation and scheduling. Manages calendars, deadlines, and reminders seamlessly.',
    price: 19.99,
    rating: 4.6,
    reviews: 567,
    icon: '✅',
    featured: false,
    tags: ['automation', 'scheduling', 'tasks'],
    stats: { deployments: 23000, uptime: 99.7 }
  },
  {
    id: 'agent-006',
    name: 'TranslateHub',
    vendor: 'Linguist AI',
    category: 'Communication',
    description: 'Real-time translation for 100+ languages. Perfect for global teams and multilingual content.',
    price: 29.99,
    rating: 4.7,
    reviews: 445,
    icon: '🌐',
    featured: false,
    tags: ['translation', 'multilingual', 'communication'],
    stats: { deployments: 18000, uptime: 99.6 }
  },
  {
    id: 'agent-007',
    name: 'DebugSheriff',
    vendor: 'DevTools Inc.',
    category: 'Development',
    description: 'Intelligent debugging assistant that finds and fixes bugs in real-time. Supports 15+ programming languages.',
    price: 59.99,
    rating: 4.8,
    reviews: 298,
    icon: '🔍',
    featured: false,
    tags: ['debugging', 'testing', 'quality'],
    stats: { deployments: 9200, uptime: 99.8 }
  },
  {
    id: 'agent-008',
    name: 'DesignGenius',
    vendor: 'Creative AI Labs',
    category: 'Creative',
    description: 'AI-powered design assistant that creates stunning UI/UX designs, logos, and branding materials.',
    price: 0,
    rating: 4.4,
    reviews: 892,
    icon: '🎨',
    featured: true,
    tags: ['design', 'ui-ux', 'branding'],
    stats: { deployments: 31000, uptime: 99.4 }
  },
  {
    id: 'agent-009',
    name: 'EmailGen Pro',
    vendor: 'Communication AI',
    category: 'Communication',
    description: 'Automate email communications with AI-generated responses, follow-ups, and personalized outreach.',
    price: 24.99,
    rating: 4.5,
    reviews: 334,
    icon: '📧',
    featured: false,
    tags: ['email', 'automation', 'outreach'],
    stats: { deployments: 15000, uptime: 99.6 }
  },
  {
    id: 'agent-010',
    name: 'ML Pipeline Builder',
    vendor: 'DataScience Pro',
    category: 'Data',
    description: 'Build and deploy machine learning pipelines in minutes. Auto-selects models and optimizes hyperparameters.',
    price: 149.99,
    rating: 4.9,
    reviews: 167,
    icon: '🤖',
    featured: true,
    tags: ['machine-learning', 'pipelines', 'automation'],
    stats: { deployments: 4200, uptime: 99.9 }
  },
  {
    id: 'agent-011',
    name: 'VideoGen Studio',
    vendor: 'Creative AI Labs',
    category: 'Creative',
    description: 'Create professional videos from text prompts. Includes editing, effects, and voice-over generation.',
    price: 89.99,
    rating: 4.6,
    reviews: 221,
    icon: '🎬',
    featured: false,
    tags: ['video', 'editing', 'production'],
    stats: { deployments: 7800, uptime: 99.5 }
  },
  {
    id: 'agent-012',
    name: 'VoiceAgent',
    vendor: 'Communication AI',
    category: 'Communication',
    description: 'AI voice assistant for calls, meetings, and voice commands. Natural language processing with emotion detection.',
    price: 39.99,
    rating: 4.7,
    reviews: 412,
    icon: '🎤',
    featured: false,
    tags: ['voice', 'assistant', 'meetings'],
    stats: { deployments: 11000, uptime: 99.7 }
  }
];

// In-memory stores
let deployedAgents = [];
let workflows = [];
let workflowIdCounter = 1;

// API Routes

// Get all agents
app.get('/api/agents', (req, res) => {
  const { category, search, sort } = req.query;
  
  let filtered = [...agents];
  
  // Filter by category
  if (category && category !== 'All') {
    filtered = filtered.filter(a => a.category === category);
  }
  
  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower) ||
      a.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }
  
  // Sort
  if (sort === 'popularity') {
    filtered.sort((a, b) => b.stats.deployments - a.stats.deployments);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }
  
  res.json(filtered);
});

// Get single agent
app.get('/api/agents/:id', (req, res) => {
  const agent = agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// Get deployed agents
app.get('/api/deployed', (req, res) => {
  res.json(deployedAgents);
});

// Deploy an agent
app.post('/api/deploy', (req, res) => {
  const { agentId, config } = req.body;
  const agent = agents.find(a => a.id === agentId);
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const existing = deployedAgents.find(d => d.agentId === agentId);
  if (existing) {
    return res.status(400).json({ error: 'Agent already deployed' });
  }
  
  const deployed = {
    id: `deployed-${Date.now()}`,
    agentId,
    agent,
    config: config || {},
    status: 'running',
    deployedAt: new Date().toISOString(),
    stats: {
      apiCalls: 0,
      uptime: 100
    }
  };
  
  deployedAgents.push(deployed);
  res.json(deployed);
});

// Update deployed agent status
app.patch('/api/deployed/:id', (req, res) => {
  const { status, config } = req.body;
  const deployed = deployedAgents.find(d => d.id === req.params.id);
  
  if (!deployed) {
    return res.status(404).json({ error: 'Deployed agent not found' });
  }
  
  if (status) deployed.status = status;
  if (config) deployed.config = { ...deployed.config, ...config };
  
  res.json(deployed);
});

// Remove deployed agent
app.delete('/api/deployed/:id', (req, res) => {
  const index = deployedAgents.findIndex(d => d.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Deployed agent not found' });
  }
  
  deployedAgents.splice(index, 1);
  res.json({ success: true });
});

// Get all workflows
app.get('/api/workflows', (req, res) => {
  res.json(workflows);
});

// Create workflow
app.post('/api/workflows', (req, res) => {
  const { name, nodes, edges } = req.body;
  
  const workflow = {
    id: `workflow-${workflowIdCounter++}`,
    name: name || 'Untitled Workflow',
    nodes: nodes || [],
    edges: edges || [],
    status: 'inactive',
    createdAt: new Date().toISOString(),
    lastRun: null
  };
  
  workflows.push(workflow);
  res.json(workflow);
});

// Update workflow
app.patch('/api/workflows/:id', (req, res) => {
  const { name, nodes, edges, status } = req.body;
  const workflow = workflows.find(w => w.id === req.params.id);
  
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  if (name) workflow.name = name;
  if (nodes) workflow.nodes = nodes;
  if (edges) workflow.edges = edges;
  if (status) workflow.status = status;
  if (status === 'running') workflow.lastRun = new Date().toISOString();
  
  res.json(workflow);
});

// Delete workflow
app.delete('/api/workflows/:id', (req, res) => {
  const index = workflows.findIndex(w => w.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  workflows.splice(index, 1);
  res.json({ success: true });
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  const totalDeployed = deployedAgents.length;
  const activeWorkflows = workflows.filter(w => w.status === 'running').length;
  const totalApiCalls = deployedAgents.reduce((sum, d) => sum + (d.stats?.apiCalls || 0), 0);
  const avgUptime = totalDeployed > 0 
    ? deployedAgents.reduce((sum, d) => sum + (d.stats?.uptime || 0), 0) / totalDeployed 
    : 100;
  
  res.json({
    totalDeployed,
    activeWorkflows,
    totalApiCalls,
    uptime: Math.round(avgUptime * 100) / 100
  });
});

app.listen(PORT, () => {
  console.log(`🤖 Agent Marketplace API running on http://localhost:${PORT}`);
});
