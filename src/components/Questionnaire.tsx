import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { questions } from '../utils/careerEngine';
import { Answer } from '../types';

interface QuestionnaireProps {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

export function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { register, handleSubmit, watch, setValue, formState: { isValid } } = useForm();

  const currentAnswer = watch(`question_${questions[currentStep]?.id}`);
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentAnswer) {
      const newAnswer: Answer = {
        questionId: questions[currentStep].id,
        selectedOption: currentAnswer
      };

      const updatedAnswers = [
        ...answers.filter(a => a.questionId !== questions[currentStep].id),
        newAnswer
      ];
      setAnswers(updatedAnswers);

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(updatedAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleOptionSelect = (value: string) => {
    setValue(`question_${questions[currentStep].id}`, value);
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl md:text-2xl">
                  {currentQuestion?.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={currentAnswer}
                  onValueChange={handleOptionSelect}
                  className="space-y-3"
                >
                  {currentQuestion?.options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-gradient-to-r hover:from-accent/30 hover:to-accent/50 transition-all cursor-pointer">
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.id}
                          className="text-primary"
                        />
                        <Label 
                          htmlFor={option.id} 
                          className="flex-1 cursor-pointer"
                        >
                          {option.text}
                        </Label>
                        {currentAnswer === option.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Back to Home' : 'Previous'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Get Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Steps Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 space-x-2"
        >
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}