import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${200 + Math.random() * 200}px`,
              height: `${200 + Math.random() * 200}px`,
              background: i % 3 === 0 
                ? `radial-gradient(circle, var(--primary), transparent)` 
                : i % 3 === 1 
                ? `radial-gradient(circle, var(--secondary), transparent)`
                : `radial-gradient(circle, #fbbf24, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 150, 0],
              y: [0, -150, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Career Discovery</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-[#fbbf24] bg-clip-text text-transparent">
              Find Your Career Path with AI Guidance
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover your ideal career path through our intelligent questionnaire. 
              Get personalized recommendations with visual roadmaps and actionable insights.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Button 
              onClick={onStartQuiz}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/70 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your skills, interests, and preferences to provide accurate career matches.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/70 transition-all duration-300 hover:border-secondary/30 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-[#fbbf24]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Visual Roadmaps</h3>
              <p className="text-sm text-muted-foreground">
                Interactive career paths with required skills, salary ranges, and growth projections.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/70 transition-all duration-300 hover:border-[#fbbf24]/30 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-[#fbbf24]/20 to-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <h3 className="font-semibold mb-2">Personalized Results</h3>
              <p className="text-sm text-muted-foreground">
                Get tailored recommendations with confidence scores and actionable next steps.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Career Assessments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}