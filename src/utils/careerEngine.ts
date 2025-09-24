import { Answer, CareerPath, CareerSuggestion, Question } from '../types';

export const questions: Question[] = [
  {
    id: 'skills',
    text: 'Which skills do you enjoy using most?',
    options: [
      { id: 'tech', text: 'Programming & Technology', value: 'tech' },
      { id: 'creative', text: 'Design & Creative Arts', value: 'creative' },
      { id: 'analytical', text: 'Data Analysis & Research', value: 'analytical' },
      { id: 'communication', text: 'Communication & Writing', value: 'communication' },
      { id: 'management', text: 'Leadership & Management', value: 'management' }
    ]
  },
  {
    id: 'work_environment',
    text: 'What work environment appeals to you most?',
    options: [
      { id: 'remote', text: 'Remote/Flexible', value: 'remote' },
      { id: 'office', text: 'Traditional Office', value: 'office' },
      { id: 'startup', text: 'Fast-paced Startup', value: 'startup' },
      { id: 'corporate', text: 'Large Corporation', value: 'corporate' },
      { id: 'freelance', text: 'Freelance/Consulting', value: 'freelance' }
    ]
  },
  {
    id: 'interests',
    text: 'What topics fascinate you the most?',
    options: [
      { id: 'ai_ml', text: 'AI & Machine Learning', value: 'ai_ml' },
      { id: 'design_ux', text: 'User Experience & Design', value: 'design_ux' },
      { id: 'business', text: 'Business & Strategy', value: 'business' },
      { id: 'healthcare', text: 'Healthcare & Medicine', value: 'healthcare' },
      { id: 'finance', text: 'Finance & Economics', value: 'finance' }
    ]
  },
  {
    id: 'collaboration',
    text: 'How do you prefer to work?',
    options: [
      { id: 'solo', text: 'Independently', value: 'solo' },
      { id: 'small_team', text: 'Small Team (2-5 people)', value: 'small_team' },
      { id: 'large_team', text: 'Large Team (6+ people)', value: 'large_team' },
      { id: 'cross_functional', text: 'Cross-functional Teams', value: 'cross_functional' },
      { id: 'client_facing', text: 'Client-facing Roles', value: 'client_facing' }
    ]
  },
  {
    id: 'problem_solving',
    text: 'What type of problems do you enjoy solving?',
    options: [
      { id: 'technical', text: 'Technical & Engineering', value: 'technical' },
      { id: 'creative_challenges', text: 'Creative & Artistic', value: 'creative_challenges' },
      { id: 'strategic', text: 'Strategic & Business', value: 'strategic' },
      { id: 'people_problems', text: 'People & Organizational', value: 'people_problems' },
      { id: 'data_insights', text: 'Data & Insights', value: 'data_insights' }
    ]
  },
  {
    id: 'career_goals',
    text: 'What are your primary career goals?',
    options: [
      { id: 'high_salary', text: 'High Compensation', value: 'high_salary' },
      { id: 'work_life_balance', text: 'Work-Life Balance', value: 'work_life_balance' },
      { id: 'impact', text: 'Making an Impact', value: 'impact' },
      { id: 'continuous_learning', text: 'Continuous Learning', value: 'continuous_learning' },
      { id: 'leadership', text: 'Leadership Opportunities', value: 'leadership' }
    ]
  },
  {
    id: 'learning_style',
    text: 'How do you prefer to learn new skills?',
    options: [
      { id: 'hands_on', text: 'Hands-on Practice', value: 'hands_on' },
      { id: 'structured', text: 'Structured Courses', value: 'structured' },
      { id: 'mentorship', text: 'Mentorship & Guidance', value: 'mentorship' },
      { id: 'self_directed', text: 'Self-directed Research', value: 'self_directed' },
      { id: 'collaborative', text: 'Collaborative Learning', value: 'collaborative' }
    ]
  }
];

const careerPaths: CareerPath[] = [
  {
    id: 'frontend_dev',
    title: 'Frontend Developer',
    description: 'Build user interfaces and interactive web experiences',
    confidence: 0,
    category: 'Technology',
    averageSalary: '$70,000 - $120,000',
    growthRate: '13% (faster than average)',
    requiredSkills: [
      { id: 'react', name: 'React/Vue/Angular', type: 'technical', importance: 9 },
      { id: 'js', name: 'JavaScript/TypeScript', type: 'technical', importance: 10 },
      { id: 'css', name: 'CSS/Styling', type: 'technical', importance: 8 },
      { id: 'design_sense', name: 'Design Sensibility', type: 'soft', importance: 7 },
      { id: 'problem_solving', name: 'Problem Solving', type: 'soft', importance: 8 }
    ]
  },
  {
    id: 'ux_designer',
    title: 'UX/UI Designer',
    description: 'Design intuitive and beautiful user experiences',
    confidence: 0,
    category: 'Design',
    averageSalary: '$65,000 - $110,000',
    growthRate: '8% (as fast as average)',
    requiredSkills: [
      { id: 'figma', name: 'Figma/Sketch', type: 'technical', importance: 9 },
      { id: 'user_research', name: 'User Research', type: 'technical', importance: 8 },
      { id: 'prototyping', name: 'Prototyping', type: 'technical', importance: 7 },
      { id: 'empathy', name: 'Empathy', type: 'soft', importance: 9 },
      { id: 'communication', name: 'Communication', type: 'soft', importance: 8 }
    ]
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    description: 'Extract insights from data to drive business decisions',
    confidence: 0,
    category: 'Analytics',
    averageSalary: '$85,000 - $150,000',
    growthRate: '35% (much faster than average)',
    requiredSkills: [
      { id: 'python', name: 'Python/R', type: 'technical', importance: 10 },
      { id: 'sql', name: 'SQL', type: 'technical', importance: 9 },
      { id: 'statistics', name: 'Statistics', type: 'technical', importance: 8 },
      { id: 'ml', name: 'Machine Learning', type: 'technical', importance: 7 },
      { id: 'critical_thinking', name: 'Critical Thinking', type: 'soft', importance: 9 }
    ]
  },
  {
    id: 'product_manager',
    title: 'Product Manager',
    description: 'Guide product strategy and coordinate cross-functional teams',
    confidence: 0,
    category: 'Management',
    averageSalary: '$90,000 - $160,000',
    growthRate: '22% (much faster than average)',
    requiredSkills: [
      { id: 'strategy', name: 'Strategic Thinking', type: 'soft', importance: 10 },
      { id: 'leadership', name: 'Leadership', type: 'soft', importance: 9 },
      { id: 'analytics', name: 'Data Analysis', type: 'technical', importance: 7 },
      { id: 'market_research', name: 'Market Research', type: 'technical', importance: 6 },
      { id: 'communication', name: 'Communication', type: 'soft', importance: 9 }
    ]
  },
  {
    id: 'ai_engineer',
    title: 'AI/ML Engineer',
    description: 'Build and deploy machine learning models and AI systems',
    confidence: 0,
    category: 'Technology',
    averageSalary: '$100,000 - $180,000',
    growthRate: '40% (much faster than average)',
    requiredSkills: [
      { id: 'python_ai', name: 'Python', type: 'technical', importance: 10 },
      { id: 'tensorflow', name: 'TensorFlow/PyTorch', type: 'technical', importance: 9 },
      { id: 'math', name: 'Mathematics', type: 'technical', importance: 8 },
      { id: 'algorithms', name: 'Algorithms', type: 'technical', importance: 9 },
      { id: 'research', name: 'Research Skills', type: 'soft', importance: 8 }
    ]
  },
  {
    id: 'content_strategist',
    title: 'Content Strategist',
    description: 'Create and manage content strategies for digital platforms',
    confidence: 0,
    category: 'Marketing',
    averageSalary: '$55,000 - $95,000',
    growthRate: '10% (as fast as average)',
    requiredSkills: [
      { id: 'writing', name: 'Writing', type: 'soft', importance: 10 },
      { id: 'seo', name: 'SEO/SEM', type: 'technical', importance: 7 },
      { id: 'analytics_tools', name: 'Analytics Tools', type: 'technical', importance: 6 },
      { id: 'creativity', name: 'Creativity', type: 'soft', importance: 9 },
      { id: 'strategic_thinking', name: 'Strategic Thinking', type: 'soft', importance: 8 }
    ]
  },
  {
    id: 'devops_engineer',
    title: 'DevOps Engineer',
    description: 'Automate and optimize software development and deployment',
    confidence: 0,
    category: 'Technology',
    averageSalary: '$85,000 - $140,000',
    growthRate: '21% (much faster than average)',
    requiredSkills: [
      { id: 'cloud', name: 'Cloud Platforms', type: 'technical', importance: 9 },
      { id: 'containers', name: 'Docker/Kubernetes', type: 'technical', importance: 8 },
      { id: 'automation', name: 'Automation Scripts', type: 'technical', importance: 8 },
      { id: 'monitoring', name: 'Monitoring Tools', type: 'technical', importance: 7 },
      { id: 'collaboration', name: 'Collaboration', type: 'soft', importance: 8 }
    ]
  },
  {
    id: 'business_analyst',
    title: 'Business Analyst',
    description: 'Analyze business processes and recommend improvements',
    confidence: 0,
    category: 'Business',
    averageSalary: '$65,000 - $110,000',
    growthRate: '14% (faster than average)',
    requiredSkills: [
      { id: 'analysis', name: 'Business Analysis', type: 'technical', importance: 9 },
      { id: 'requirements', name: 'Requirements Gathering', type: 'soft', importance: 8 },
      { id: 'excel', name: 'Excel/Data Tools', type: 'technical', importance: 7 },
      { id: 'communication_ba', name: 'Communication', type: 'soft', importance: 9 },
      { id: 'process_improvement', name: 'Process Improvement', type: 'soft', importance: 8 }
    ]
  }
];

const scoring = {
  // Skills preferences
  tech: { frontend_dev: 10, ai_engineer: 8, devops_engineer: 9, data_scientist: 6 },
  creative: { ux_designer: 10, content_strategist: 8, frontend_dev: 6 },
  analytical: { data_scientist: 10, business_analyst: 9, ai_engineer: 7, product_manager: 6 },
  communication: { content_strategist: 10, product_manager: 8, business_analyst: 7, ux_designer: 6 },
  management: { product_manager: 10, business_analyst: 6, devops_engineer: 5 },

  // Work environment
  remote: { frontend_dev: 8, content_strategist: 9, data_scientist: 7, ai_engineer: 7 },
  startup: { frontend_dev: 8, ux_designer: 8, product_manager: 9, ai_engineer: 7 },
  corporate: { business_analyst: 9, product_manager: 8, devops_engineer: 7, data_scientist: 7 },
  
  // Interests
  ai_ml: { ai_engineer: 10, data_scientist: 9, frontend_dev: 4 },
  design_ux: { ux_designer: 10, frontend_dev: 8, content_strategist: 5 },
  business: { business_analyst: 10, product_manager: 9, content_strategist: 6 },
  
  // Collaboration style
  solo: { data_scientist: 8, ai_engineer: 7, content_strategist: 8, frontend_dev: 6 },
  small_team: { frontend_dev: 8, ux_designer: 8, ai_engineer: 7 },
  large_team: { devops_engineer: 8, business_analyst: 7, product_manager: 9 },
  cross_functional: { product_manager: 10, ux_designer: 8, business_analyst: 7 },
  
  // Problem solving
  technical: { frontend_dev: 9, ai_engineer: 10, devops_engineer: 9, data_scientist: 8 },
  creative_challenges: { ux_designer: 10, content_strategist: 9, frontend_dev: 6 },
  strategic: { product_manager: 10, business_analyst: 9, content_strategist: 6 },
  data_insights: { data_scientist: 10, ai_engineer: 8, business_analyst: 7 },
  
  // Career goals
  high_salary: { ai_engineer: 9, data_scientist: 8, product_manager: 8, devops_engineer: 7 },
  work_life_balance: { content_strategist: 8, ux_designer: 7, frontend_dev: 7 },
  impact: { product_manager: 9, ai_engineer: 8, ux_designer: 7, data_scientist: 7 },
  continuous_learning: { ai_engineer: 9, data_scientist: 8, frontend_dev: 7, devops_engineer: 7 },
  
  // Learning style
  hands_on: { frontend_dev: 9, devops_engineer: 8, ai_engineer: 7 },
  structured: { business_analyst: 8, data_scientist: 7, product_manager: 6 },
  mentorship: { product_manager: 8, ux_designer: 7, business_analyst: 6 },
  self_directed: { ai_engineer: 8, data_scientist: 8, content_strategist: 7 }
};

export function analyzeAnswers(answers: Answer[]): CareerSuggestion {
  const scores: { [key: string]: number } = {};
  
  // Initialize scores
  careerPaths.forEach(path => {
    scores[path.id] = 0;
  });
  
  // Calculate scores based on answers
  answers.forEach(answer => {
    const value = answer.selectedOption;
    const weights = scoring[value as keyof typeof scoring];
    
    if (weights) {
      Object.entries(weights).forEach(([pathId, weight]) => {
        scores[pathId] = (scores[pathId] || 0) + weight;
      });
    }
  });
  
  // Normalize scores and create suggestions
  const maxScore = Math.max(...Object.values(scores));
  const suggestions = careerPaths
    .map(path => ({
      ...path,
      confidence: Math.round((scores[path.id] / maxScore) * 100)
    }))
    .filter(path => path.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5); // Top 5 suggestions
  
  // Get dominant categories
  const categoryScores: { [key: string]: number } = {};
  suggestions.forEach(path => {
    categoryScores[path.category] = (categoryScores[path.category] || 0) + path.confidence;
  });
  
  const dominantCategories = Object.entries(categoryScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);
  
  return {
    paths: suggestions,
    totalScore: maxScore,
    dominantCategories
  };
}