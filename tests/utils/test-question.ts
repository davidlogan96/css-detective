import { Page } from '@playwright/test';
import { Question } from '../fixtures/test-quiz-data';
import { validateQuestion } from '../question-validator';

/**
 * Utility for testing individual questions during development
 * Usage: await testQuestion(page, myNewQuestion);
 */
export async function testQuestion(page: Page, question: Question): Promise<void> {
  console.log(`Testing question: ${question.id} - ${question.title}`);
  
  try {
    await validateQuestion(page, question);
    console.log(`✅ Question ${question.id} passed validation`);
  } catch (error) {
    console.error(`❌ Question ${question.id} failed validation:`, error);
    throw error;
  }
}

/**
 * Test a question and return validation results without throwing
 * Useful for batch validation or question generation workflows
 */
export async function validateQuestionSafe(page: Page, question: Question): Promise<{
  valid: boolean;
  error?: string;
  questionId: string;
}> {
  try {
    await validateQuestion(page, question);
    return { valid: true, questionId: question.id };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : String(error),
      questionId: question.id 
    };
  }
}