import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { CareerSuggestion } from '../types';
import { CareerRoadmap } from './CareerRoadmap';

interface ResultsProps {
  suggestion: CareerSuggestion;
  onRestart: () => void;
}

export function Results({ suggestion, onRestart }: ResultsProps) {
  const [selectedCareer, setSelectedCareer] = useState(suggestion.paths[0]);

  const handleExport = () => {
    // Create a simple export functionality
    const exportData = {
      timestamp: new Date().toISOString(),
      suggestions: suggestion.paths.map(path => ({
        title: path.title,
        confidence: path.confidence,
        description: path.description,
        skills: path.requiredSkills.map(skill => skill.name),
        salary: path.averageSalary,
        growth: path.growthRate
      })),
      dominantCategories: suggestion.dominantCategories
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'career-path-results.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSkillTypeIcon = (type: string) => {
    switch (type) {
      case 'technical': return <BookOpen className="w-4 h-4" />;
      case 'soft': return <Users className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getSkillTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-primary/20 text-primary border-primary/30';
      case 'soft': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'certification': return 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Career Path Results</h1>
            <p className="text-muted-foreground">
              Based on your responses, here are your personalized career recommendations
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onRestart}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button onClick={handleExport} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Top Match</p>
                  <p className="text-sm text-muted-foreground">{suggestion.paths[0]?.confidence}% confidence</p>
                </div>
              </div>
              <p className="font-medium">{suggestion.paths[0]?.title}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-[#fbbf24]/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Career Paths</p>
                  <p className="text-sm text-muted-foreground">{suggestion.paths.length} matches found</p>
                </div>
              </div>
              <p className="font-medium">Multiple Options</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#fbbf24]/20 to-primary/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-semibold">Top Categories</p>
                  <p className="text-sm text-muted-foreground">Best fit areas</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {suggestion.dominantCategories.slice(0, 2).map(category => (
                  <Badge key={category} variant="secondary" className="text-xs bg-gradient-to-r from-secondary/20 to-[#fbbf24]/20 text-secondary border-secondary/30">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="roadmap" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="roadmap">Visual Roadmap</TabsTrigger>
              <TabsTrigger value="careers">Career Paths</TabsTrigger>
              <TabsTrigger value="skills">Skills Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="roadmap" className="space-y-6">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Your Career Universe
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Interactive visualization of your career paths and required skills
                  </p>
                </CardHeader>
                <CardContent>
                  <CareerRoadmap careerPaths={suggestion.paths} />
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">How to read this chart:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <span>Career paths with confidence scores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                        <span>Technical skills required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                        <span>Soft skills needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#fbbf24]"></div>
                        <span>Certifications recommended</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="careers" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Career List */}
                <div className="lg:col-span-1 space-y-4">
                  {suggestion.paths.map((career, index) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:shadow-lg border-border/50 bg-card/80 backdrop-blur-sm ${
                          selectedCareer.id === career.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedCareer(career)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{career.title}</h3>
                            <Badge variant="secondary">{career.confidence}%</Badge>
                          </div>
                          <Progress value={career.confidence} className="h-2 mb-2" />
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {career.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Career Details */}
                <div className="lg:col-span-2">
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                          <p className="text-muted-foreground mt-1">{selectedCareer.description}</p>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {selectedCareer.confidence}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Career Stats */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-secondary/10 to-[#fbbf24]/10 rounded-lg border border-secondary/20">
                          <DollarSign className="w-8 h-8 text-secondary" />
                          <div>
                            <p className="font-medium">Average Salary</p>
                            <p className="text-sm text-muted-foreground">{selectedCareer.averageSalary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                          <TrendingUp className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">Job Growth</p>
                            <p className="text-sm text-muted-foreground">{selectedCareer.growthRate}</p>
                          </div>
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div>
                        <h4 className="font-semibold mb-4">Required Skills</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedCareer.requiredSkills
                            .sort((a, b) => b.importance - a.importance)
                            .map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${getSkillTypeColor(skill.type)}`}>
                                  {getSkillTypeIcon(skill.type)}
                                </div>
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={skill.importance * 10} className="w-16 h-2" />
                                <span className="text-sm text-muted-foreground w-8">{skill.importance}/10</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {['technical', 'soft', 'certification'].map((skillType) => (
                  <Card key={skillType} className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 capitalize">
                        {getSkillTypeIcon(skillType)}
                        {skillType === 'certification' ? 'Certifications' : `${skillType} Skills`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {suggestion.paths
                          .flatMap(path => path.requiredSkills)
                          .filter(skill => skill.type === skillType)
                          .reduce((unique, skill) => {
                            if (!unique.find(s => s.name === skill.name)) {
                              unique.push(skill);
                            }
                            return unique;
                          }, [] as typeof suggestion.paths[0]['requiredSkills'])
                          .sort((a, b) => b.importance - a.importance)
                          .slice(0, 8)
                          .map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between">
                              <span className="text-sm">{skill.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {skill.importance}/10
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}