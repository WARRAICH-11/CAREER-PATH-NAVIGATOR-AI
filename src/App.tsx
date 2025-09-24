import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Questionnaire } from './components/Questionnaire';
import { Results } from './components/Results';
import { DarkModeToggle } from './components/DarkModeToggle';
import { analyzeAnswers } from './utils/careerEngine';
import { Answer, CareerSuggestion } from './types';

type AppState = 'landing' | 'questionnaire' | 'results';

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [careerSuggestion, setCareerSuggestion] = useState<CareerSuggestion | null>(null);

  const handleStartQuiz = () => {
    setCurrentView('questionnaire');
  };

  const handleQuestionnaireComplete = (answers: Answer[]) => {
    const suggestion = analyzeAnswers(answers);
    setCareerSuggestion(suggestion);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setCurrentView('landing');
    setCareerSuggestion(null);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen">
      <DarkModeToggle />
      
      {currentView === 'landing' && (
        <LandingPage onStartQuiz={handleStartQuiz} />
      )}
      
      {currentView === 'questionnaire' && (
        <Questionnaire 
          onComplete={handleQuestionnaireComplete} 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentView === 'results' && careerSuggestion && (
        <Results 
          suggestion={careerSuggestion} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}