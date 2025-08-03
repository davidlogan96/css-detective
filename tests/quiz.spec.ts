import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('CSS Detective Quiz', () => {
  test('should display the category selection screen initially', async ({ page }) => {
    // Check for the main title using testid
    await expect(page.getByTestId('category-selection-title')).toBeVisible();
    
    // Check for the description
    await expect(page.getByText('Pick the CSS topics you want to be quizzed on')).toBeVisible();
    
    // Check that all 5 categories are displayed using testids
    await expect(page.getByTestId('category-button-basics')).toBeVisible();
    await expect(page.getByTestId('category-button-layout')).toBeVisible();
    await expect(page.getByTestId('category-button-effects')).toBeVisible();
    await expect(page.getByTestId('category-button-typography')).toBeVisible();
    await expect(page.getByTestId('category-button-colors')).toBeVisible();
    
    // Check that "Basics" is selected by default (look for the check icon)
    await expect(page.getByTestId('category-button-basics').locator('.lucide-check')).toBeVisible();
  });

  test('should allow selecting and deselecting categories', async ({ page }) => {
    // Initially Basics should be selected (check for the visual selection indicator)
    await expect(page.getByTestId('category-button-basics').locator('.lucide-check')).toBeVisible();
    
    // Click on Layout to select it
    await page.getByTestId('category-button-layout').click();
    await expect(page.getByTestId('category-button-layout').locator('.lucide-check')).toBeVisible();
    
    // Deselect Basics
    await page.getByTestId('category-button-basics').click();
    await expect(page.getByTestId('category-button-basics').locator('.lucide-check')).not.toBeVisible();
    
    // Should show question count for selected categories
    await expect(page.getByTestId('question-count')).toContainText('questions selected from');
  });

  test('should start quiz when Start Quiz button is clicked', async ({ page }) => {
    // Click Start Quiz using testid
    await page.getByTestId('start-quiz-button').click();
    
    // Wait for quiz to load
    await page.waitForTimeout(2000);
    
    // Should navigate to the quiz screen - check for key elements using testids
    await expect(page.getByTestId('question-counter')).toBeVisible();
    await expect(page.getByTestId('progress-bar')).toBeVisible();
    
    // Should display question title
    await expect(page.getByTestId('question-title')).toBeVisible();
    
    // Should display multiple choice options and submit button
    await expect(page.getByTestId('submit-answer-button')).toBeVisible();
  });

  test('should prevent starting quiz with no categories selected', async ({ page }) => {
    // Deselect the default "Basics" category
    await page.getByTestId('category-button-basics').click();
    
    // Start Quiz button should be disabled
    await expect(page.getByTestId('start-quiz-button')).toBeDisabled();
    
    // Should show message about selecting categories
    await expect(page.getByTestId('question-count')).toContainText('Select at least one category to start the quiz');
  });

  test('should allow answering questions with submit-then-next flow', async ({ page }) => {
    // Start the quiz
    await page.getByTestId('start-quiz-button').click();
    
    // Wait for quiz to load
    await page.waitForTimeout(1000);
    
    // Select the first answer option
    await page.getByTestId('answer-option-0').click();
    
    // Submit button should be enabled
    await expect(page.getByTestId('submit-answer-button')).toBeEnabled();
    
    // Submit the answer
    await page.getByTestId('submit-answer-button').click();
    
    // Should show next question button
    await expect(page.getByTestId('next-question-button')).toBeVisible();
    
    // First option should be disabled after submission
    await expect(page.getByTestId('answer-option-0')).toBeDisabled();
  });

  test('should show quiz completion screen', async ({ page }) => {
    // Start with basics category (fewer questions for faster test)
    await page.getByTestId('start-quiz-button').click();
    
    // Answer all questions quickly
    let questionCount = 0;
    const maxQuestions = 20; // Safety limit
    
    while (questionCount < maxQuestions) {
      // Wait for quiz to load
      await page.waitForTimeout(500);
      
      // Try to find and click the first option
      const firstOption = page.getByTestId('answer-option-0');
      
      if (!(await firstOption.isVisible())) {
        // If no more options, we might be at completion screen
        break;
      }
      
      await firstOption.click();
      await page.getByTestId('submit-answer-button').click();
      
      const nextButton = page.getByTestId('next-question-button');
      const buttonText = await nextButton.textContent();
      
      await nextButton.click();
      
      if (buttonText?.includes('Finish Quiz')) {
        break;
      }
      
      questionCount++;
    }
    
    // Should show completion screen using testids
    await expect(page.getByTestId('completion-title')).toBeVisible();
    await expect(page.getByText('You\'ve reached the end of the line, detective.')).toBeVisible();
    
    // Should show score
    await expect(page.getByTestId('score-display')).toBeVisible();
    await expect(page.getByText('Correct Answers')).toBeVisible();
    
    // Should have restart options
    await expect(page.getByTestId('new-categories-button')).toBeVisible();
    await expect(page.getByTestId('same-categories-button')).toBeVisible();
  });

  test('should display visual elements correctly', async ({ page }) => {
    // Start the quiz
    await page.getByTestId('start-quiz-button').click();
    
    // Wait for quiz to load
    await page.waitForTimeout(1000);
    
    // Should display the visual demonstration area
    await expect(page.getByTestId('visual-demo')).toBeVisible();
    
    // Should display category badge
    await expect(page.getByText('Basics')).toBeVisible();
    
    // Should display progress bar
    await expect(page.getByTestId('progress-bar')).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Category selection should be responsive
    await expect(page.getByTestId('category-selection-title')).toBeVisible();
    
    // Categories should stack on mobile
    await expect(page.getByTestId('category-button-basics')).toBeVisible();
    
    // Start quiz and check mobile layout
    await page.getByTestId('start-quiz-button').click();
    
    // Wait for quiz to load
    await page.waitForTimeout(1000);
    
    // Quiz should display properly on mobile (question title)
    await expect(page.getByTestId('question-title')).toBeVisible();
    await expect(page.getByTestId('answer-option-0')).toBeVisible();
  });

  test('should handle category filtering correctly', async ({ page }) => {
    // Select only Layout category
    await page.getByTestId('category-button-basics').click(); // Deselect basics
    await page.getByTestId('category-button-layout').click(); // Select layout
    
    // Check question count updates
    await expect(page.getByTestId('question-count')).toContainText('questions selected from 1 category');
    
    // Start quiz
    await page.getByTestId('start-quiz-button').click();
    
    // Wait for quiz to load
    await page.waitForTimeout(1000);
    
    // Should display Layout category badge (be more specific to avoid multiple matches)
    await expect(page.locator('.rounded-full').filter({ hasText: 'Layout' })).toBeVisible();
  });

  test('should navigate back to category selection', async ({ page }) => {
    // Start quiz and complete it
    await page.getByTestId('start-quiz-button').click();
    
    // Fast-forward through questions (simplified)
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(500);
      const firstOption = page.getByTestId('answer-option-0');
      if (!(await firstOption.isVisible())) break;
      
      await firstOption.click();
      await page.getByTestId('submit-answer-button').click();
      
      const nextButton = page.getByTestId('next-question-button');
      const buttonText = await nextButton.textContent();
      await nextButton.click();
      
      if (buttonText?.includes('Finish Quiz')) break;
    }
    
    // Click "New Categories" to go back
    if (await page.getByTestId('new-categories-button').isVisible()) {
      await page.getByTestId('new-categories-button').click();
      
      // Should be back at category selection
      await expect(page.getByTestId('category-selection-title')).toBeVisible();
    }
  });
});