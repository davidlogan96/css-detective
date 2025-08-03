
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { quizQuestions, categories, type Question, type Category } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Award, Target, Repeat, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Quiz() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(['basics']));
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startQuiz = () => {
    const filteredQuestions = quizQuestions.filter(q => selectedCategories.has(q.category));
    setShuffledQuestions(shuffleArray([...filteredQuestions]));
    setShowCategorySelection(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
  };

  const toggleCategory = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }
    setSelectedCategories(newSelected);
  };

  const handleBackToCategories = () => {
    setShowCategorySelection(true);
    setQuizFinished(false);
  };

  const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [currentQuestionIndex, shuffledQuestions]);

  const handleOptionSelect = (optionIndex: number) => {
    // Only allow selection changes before submission
    if (isCorrect !== null) return;
    
    // Toggle selection: if clicking the same option, deselect it
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    const correct = currentQuestion.options[selectedOption].isCorrect;
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
    const filteredQuestions = quizQuestions.filter(q => selectedCategories.has(q.category));
    setShuffledQuestions(shuffleArray([...filteredQuestions]));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
  };
  
  const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;

  // Category Selection Screen
  if (showCategorySelection) {
    return (
      <Card className="w-full max-w-4xl mx-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl font-headline text-center" data-testid="category-selection-title">Select Quiz Categories</CardTitle>
          <CardDescription className="text-center text-sm md:text-base">
            Pick the CSS topics you want to be quizzed on. You can select multiple categories.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {Object.values(categories).map((category) => {
              const isSelected = selectedCategories.has(category.id);
              const questionCount = quizQuestions.filter(q => q.category === category.id).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  data-testid={`category-button-${category.id}`}
                  className={cn(
                    'p-4 md:p-6 rounded-lg border-2 text-left transition-all duration-200 relative touch-manipulation',
                    'min-h-[100px] md:min-h-[120px] active:scale-95',
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    >
                      <category.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 leading-tight">{category.name}</h3>
                      <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 leading-relaxed">{category.description}</p>
                      <div className="text-xs text-muted-foreground">
                        {questionCount} question{questionCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3 md:gap-4 px-4 md:px-6">
          <div className="text-center text-xs md:text-sm text-muted-foreground" data-testid="question-count">
            {selectedCategories.size > 0 ? (
              <>
                {quizQuestions.filter(q => selectedCategories.has(q.category)).length} questions selected 
                from {selectedCategories.size} categor{selectedCategories.size !== 1 ? 'ies' : 'y'}
              </>
            ) : (
              'Select at least one category to start the quiz'
            )}
          </div>
          
          <Button 
            onClick={startQuiz} 
            disabled={selectedCategories.size === 0}
            className="w-full touch-manipulation active:scale-95" 
            size="lg"
            data-testid="start-quiz-button"
          >
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!isClient || !currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-4 animate-in fade-in zoom-in-95">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 md:h-8 w-3/4" />
          <Skeleton className="h-2 w-full mt-2" />
          <Skeleton className="h-4 md:h-5 w-full mt-4" />
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <Skeleton className="h-48 md:h-60 w-full" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-3 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-3 w-full">
                <Skeleton className="h-12 md:h-14 w-full" />
                <Skeleton className="h-12 md:h-14 w-full" />
                <Skeleton className="h-12 md:h-14 w-full" />
                <Skeleton className="h-12 md:h-14 w-full" />
            </div>
        </CardFooter>
      </Card>
    );
  }

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl text-center animate-in fade-in zoom-in-95">
        <CardHeader>
          <div className="mx-auto bg-accent/10 border border-accent/20 p-3 rounded-full mb-4 w-fit">
            <Award className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-3xl" data-testid="completion-title">Quiz Complete!</CardTitle>
          <CardDescription>
            You've reached the end of the line, detective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold text-foreground" data-testid="score-display">
            {score} / {shuffledQuestions.length}
          </p>
          <p className="text-muted-foreground mt-2">Correct Answers</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
            <Button onClick={handleBackToCategories} variant="outline" className="flex-1 touch-manipulation active:scale-95" data-testid="new-categories-button">
              <Target className="mr-2 h-4 w-4" />
              New Categories
            </Button>
            <Button onClick={handleRestart} className="flex-1 touch-manipulation active:scale-95" size="lg" data-testid="same-categories-button">
              <Repeat className="mr-2 h-4 w-4" />
              Same Categories
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  const showComparison = currentQuestion.property === 'transform' || currentQuestion.property === 'filter';
  const showMarginContainer = currentQuestion.property === 'margin';
  const showPaddingContent = currentQuestion.property === 'padding';
  const showFlexboxContent = currentQuestion.property === 'flexbox';
  const showGridContent = currentQuestion.property === 'grid';
  const showTextContent = currentQuestion.textContent;

  const renderVisualContent = () => {
    if (showComparison) {
      return (
        <div className="flex w-full justify-around items-center">
          <div style={{...currentQuestion.originalStyle, width: '6rem', height: '6rem'}} className="md:w-40 md:h-40" />
          <span className="text-2xl md:text-4xl text-foreground/50 shrink-0 font-light">→</span>
          <div
            className="flex items-center justify-center transition-all duration-300 ease-in-out"
            style={{...currentQuestion.style, width: '6rem', height: '6rem'}}
          />
        </div>
      );
    }
    
    if (showMarginContainer) {
      return (
        <div className="border-2 border-dashed border-foreground/30 flex items-center justify-center">
          <div
            className="flex items-center justify-center transition-all duration-300 ease-in-out"
            style={{...currentQuestion.style, width: '5rem', height: '5rem'}}
          />
        </div>
      );
    }
    
    if (showPaddingContent) {
      return (
        <div
          className="flex items-center justify-center transition-all duration-300 ease-in-out"
          style={currentQuestion.style}
        >
          <div className="h-full w-full rounded-md bg-background/50 border-2 border-dashed" />
        </div>
      );
    }
    
    if (showFlexboxContent) {
      if (currentQuestion.multipleItems) {
        return (
          <div style={{...currentQuestion.style, width: '10rem', height: '4rem'}} className="md:w-48 md:h-24">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded"></div>
          </div>
        );
      }
      return (
        <div style={{...currentQuestion.style, width: '10rem', height: '6rem'}} className="md:w-48 md:h-32">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded"></div>
        </div>
      );
    }
    
    if (showGridContent) {
      return (
        <div style={{...currentQuestion.style, width: '10rem', height: '6rem'}} className="md:w-48 md:h-32">
          <div className="bg-primary rounded"></div>
          <div className="bg-primary rounded"></div>
          <div className="bg-primary rounded"></div>
          <div className="bg-primary rounded"></div>
        </div>
      );
    }
    
    if (showTextContent) {
      return (
        <div
          className="flex items-center justify-center transition-all duration-300 ease-in-out text-center"
          style={{...currentQuestion.style, fontSize: '1.5rem'}}
        >
          {currentQuestion.textContent}
        </div>
      );
    }
    
    // Default case for simple style applications
    return (
      <div
        className="flex items-center justify-center transition-all duration-300 ease-in-out"
        style={{...currentQuestion.style, width: '8rem', height: '8rem'}}
      />
    );
  };

  return (
    <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <CardTitle className="text-lg md:text-2xl font-headline truncate" data-testid="question-title">{currentQuestion.title}</CardTitle>
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                style={{ 
                  backgroundColor: `${categories[currentQuestion.category].color}15`, 
                  color: categories[currentQuestion.category].color 
                }}
              >
                {categories[currentQuestion.category].name}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground flex-shrink-0">
                <Target className="h-3 w-3 md:h-4 md:w-4" />
                <span data-testid="question-counter">{currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
            </div>
        </div>
        <Progress value={isCorrect !== null ? ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100 : progress} className="h-2" data-testid="progress-bar" />
        <CardDescription className="pt-3 md:pt-4 text-sm md:text-base">{currentQuestion.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="relative flex h-48 md:h-60 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-3 md:p-4 overflow-hidden" data-testid="visual-demo">
          {renderVisualContent()}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 w-full">
          {currentQuestion.options.map((option, index) => {
             const isSelected = selectedOption === index;
             const showAsCorrect = isCorrect !== null && option.isCorrect;
             const showAsIncorrect = isSelected && isCorrect === false;

            return (
                <Button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isCorrect !== null}
                    variant="outline"
                    data-testid={`answer-option-${index}`}
                    className={cn(
                        'justify-start text-left text-sm md:text-base h-auto min-h-12 md:min-h-14 font-mono transition-all duration-300 p-3 md:p-4 relative',
                        'touch-manipulation active:scale-[0.98]',
                        isSelected && isCorrect === null && 'border-primary bg-primary/5',
                        showAsCorrect && 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 hover:bg-green-500/20',
                        showAsIncorrect && 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 hover:bg-red-500/20 animate-pulse'
                    )}
                >
                    <span className="whitespace-pre-wrap leading-relaxed">{option.label}</span>
                    {isSelected && isCorrect !== null && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 animate-in zoom-in-75 duration-300" />
                        ) : (
                          <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 animate-in zoom-in-75 duration-300" />
                        )}
                      </div>
                    )}
                </Button>
            );
          })}
        </div>
        
        {/* Submit/Next Button Area */}
        <div className="w-full">
          {isCorrect === null ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={selectedOption === null}
              className="w-full touch-manipulation active:scale-95" 
              size="lg"
              data-testid="submit-answer-button"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full touch-manipulation active:scale-95" 
              size="lg"
              data-testid="next-question-button"
            >
              {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
