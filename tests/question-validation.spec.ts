import { test } from '@playwright/test';
import { testQuizQuestions } from './fixtures/test-quiz-data';
import { validateQuestion } from './question-validator';

/**
 * Automated validation of all quiz questions
 * This elegant approach tests every question automatically
 */

// Test each question individually for better error reporting
testQuizQuestions.forEach(question => {
  test(`Question ${question.id}: ${question.title}`, async ({ page }) => {
    await validateQuestion(page, question);
  });
});

// Optional: Test all questions in batch for performance
test('Validate all questions in batch', async ({ page }) => {
  for (const question of testQuizQuestions) {
    await validateQuestion(page, question);
  }
});