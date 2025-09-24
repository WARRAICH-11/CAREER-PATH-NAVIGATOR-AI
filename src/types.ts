export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: string;
}

export interface Answer {
  questionId: string;
  selectedOption: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  confidence: number;
  requiredSkills: Skill[];
  category: string;
  averageSalary: string;
  growthRate: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'technical' | 'soft' | 'certification';
  importance: number;
}

export interface CareerSuggestion {
  paths: CareerPath[];
  totalScore: number;
  dominantCategories: string[];
}