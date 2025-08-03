"use client";

import React, { useState, useMemo } from 'react';
import { quizQuestions, type Question } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Award, Target, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() => shuffleArray([...quizQuestions]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [currentQuestionIndex, shuffledQuestions]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;

    const correct = currentQuestion.options[optionIndex].isCorrect;
    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray([...quizQuestions]));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
  };
  
  const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl text-center animate-in fade-in zoom-in-95">
        <CardHeader>
          <div className="mx-auto bg-accent/10 border border-accent/20 p-3 rounded-full mb-4 w-fit">
            <Award className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          <CardDescription>
            You've reached the end of the line, detective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold text-foreground">
            {score} / {shuffledQuestions.length}
          </p>
          <p className="text-muted-foreground mt-2">Correct Answers</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full" size="lg">
            <Repeat className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 mb-2">
            <CardTitle className="text-2xl font-headline">{currentQuestion.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>{currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
            </div>
        </div>
        <Progress value={selectedOption !== null ? ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100 : progress} className="h-2" />
        <CardDescription className="pt-4">{currentQuestion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-4 overflow-hidden">
          <div
            className="flex items-center justify-center transition-all duration-300 ease-in-out"
            style={currentQuestion.style}
          >
            {currentQuestion.property === 'padding' && <div className="h-8 w-8 rounded-md bg-background/50" data-ai-hint="geometric shape"></div>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {currentQuestion.options.map((option, index) => {
             const isSelected = selectedOption === index;
             const showAsCorrect = selectedOption !== null && option.isCorrect;
             const showAsIncorrect = isSelected && !isCorrect;

            return (
                <Button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    variant="outline"
                    size="lg"
                    className={cn(
                        'justify-start text-base h-14 font-mono transition-all duration-300',
                        showAsCorrect && 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 hover:bg-green-500/20',
                        showAsIncorrect && 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 hover:bg-red-500/20 animate-shake',
                        selectedOption !== null && !isSelected && !option.isCorrect && 'opacity-50'
                    )}
                >
                    {option.label}
                </Button>
            );
          })}
        </div>
        {selectedOption !== null && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 font-semibold">
              {isCorrect ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <span className={cn(isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </span>
            </div>
            <Button onClick={handleNextQuestion} className="w-full sm:w-auto" autoFocus>
              {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
