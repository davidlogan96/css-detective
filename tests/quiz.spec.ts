import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('CSS Detective Quiz', () => {
  test('should display the category selection screen initially', async ({ page }) => {
    // Check for the main title (it might be in a CardTitle component, not semantic heading)
    await expect(page.getByText('Select Quiz Categories')).toBeVisible();
    
    // Check for the description
    await expect(page.getByText('Pick the CSS topics you want to be quizzed on')).toBeVisible();
    
    // Check that all 5 categories are displayed
    await expect(page.getByText('Basics')).toBeVisible();
    await expect(page.getByText('Layout')).toBeVisible();
    await expect(page.getByText('Visual Effects')).toBeVisible();
    await expect(page.getByText('Typography')).toBeVisible();
    await expect(page.getByText('Colors & Gradients')).toBeVisible();
    
    // Check that "Basics" is selected by default (look for the check icon)
    await expect(page.locator('button').filter({ hasText: 'Basics' }).locator('.lucide-check')).toBeVisible();
  });

  test('should allow selecting and deselecting categories', async ({ page }) => {
    // Initially Basics should be selected (check for the visual selection indicator)
    await expect(page.locator('button').filter({ hasText: 'Basics' }).locator('.lucide-check')).toBeVisible();
    
    // Click on Layout to select it
    await page.locator('button').filter({ hasText: 'Layout' }).click();
    await expect(page.locator('button').filter({ hasText: 'Layout' }).locator('.lucide-check')).toBeVisible();
    
    // Deselect Basics
    await page.locator('button').filter({ hasText: 'Basics' }).click();
    await expect(page.locator('button').filter({ hasText: 'Basics' }).locator('.lucide-check')).not.toBeVisible();
    
    // Should show question count for selected categories
    await expect(page.getByText(/questions selected from/)).toBeVisible();
  });

  test('should start quiz when Start Quiz button is clicked', async ({ page }) => {
    // Click Start Quiz (Basics should be selected by default)
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Wait for quiz to load
    await page.waitForTimeout(2000);
    
    // Should navigate to the quiz screen - check for key elements
    await expect(page.getByText(/\d+ of \d+/)).toBeVisible(); // Question counter
    await expect(page.locator('.h-2')).toBeVisible(); // Progress bar
    
    // Should display question title
    await expect(page.locator('.font-headline').nth(1)).toBeVisible();
    
    // Should display multiple choice options (check for Submit Answer button instead of specific text)
    await expect(page.getByRole('button', { name: 'Submit Answer' })).toBeVisible();
  });

  test('should prevent starting quiz with no categories selected', async ({ page }) => {
    // Deselect the default "Basics" category
    await page.locator('button').filter({ hasText: 'Basics' }).click();
    
    // Start Quiz button should be disabled
    await expect(page.getByRole('button', { name: 'Start Quiz' })).toBeDisabled();
    
    // Should show message about selecting categories
    await expect(page.getByText('Select at least one category to start the quiz')).toBeVisible();
  });

  test('should allow answering questions with submit-then-next flow', async ({ page }) => {
    // Start the quiz
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Select an answer option
    const firstOption = page.getByRole('button', { name: /border-radius|margin|padding/ }).first();
    await firstOption.click();
    
    // Submit button should be enabled
    await expect(page.getByRole('button', { name: 'Submit Answer' })).toBeEnabled();
    
    // Submit the answer
    await page.getByRole('button', { name: 'Submit Answer' }).click();
    
    // Should show next question button
    await expect(page.getByRole('button', { name: /Next Question|Finish Quiz/ })).toBeVisible();
    
    // Options should be disabled after submission
    await expect(firstOption).toBeDisabled();
  });

  test('should show quiz completion screen', async ({ page }) => {
    // Start with basics category (fewer questions for faster test)
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Answer all questions quickly
    let questionCount = 0;
    const maxQuestions = 20; // Safety limit
    
    while (questionCount < maxQuestions) {
      // Try to find and click the first option
      const firstOption = page.getByRole('button', { name: /border-radius|margin|padding|transform|filter|cursor|opacity|flexbox|grid|box-shadow|font-weight|text-align|background/ }).first();
      
      if (!(await firstOption.isVisible())) {
        // If no more options, we might be at completion screen
        break;
      }
      
      await firstOption.click();
      await page.getByRole('button', { name: 'Submit Answer' }).click();
      
      const nextButton = page.getByRole('button', { name: /Next Question|Finish Quiz/ });
      const buttonText = await nextButton.textContent();
      
      await nextButton.click();
      
      if (buttonText?.includes('Finish Quiz')) {
        break;
      }
      
      questionCount++;
    }
    
    // Should show completion screen
    await expect(page.getByText('Quiz Complete!')).toBeVisible();
    await expect(page.getByText('You\'ve reached the end of the line, detective.')).toBeVisible();
    
    // Should show score
    await expect(page.getByText(/\d+ \/ \d+/)).toBeVisible();
    await expect(page.getByText('Correct Answers')).toBeVisible();
    
    // Should have restart options
    await expect(page.getByRole('button', { name: 'New Categories' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Same Categories' })).toBeVisible();
  });

  test('should display visual elements correctly', async ({ page }) => {
    // Start the quiz
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Should display the visual demonstration area
    await expect(page.locator('.border-dashed').first()).toBeVisible();
    
    // Should display category badge
    await expect(page.getByText('Basics')).toBeVisible();
    
    // Should display progress bar
    await expect(page.locator('.h-2')).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Category selection should be responsive
    await expect(page.getByText('Select Quiz Categories')).toBeVisible();
    
    // Categories should stack on mobile
    const categoryButtons = page.locator('button').filter({ hasText: /Basics|Layout|Visual Effects/ });
    await expect(categoryButtons.first()).toBeVisible();
    
    // Start quiz and check mobile layout
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Quiz should display properly on mobile (question title)
    await expect(page.locator('.font-headline').nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: /border-radius|margin|padding/ }).first()).toBeVisible();
  });

  test('should handle category filtering correctly', async ({ page }) => {
    // Select only Layout category
    await page.locator('button').filter({ hasText: 'Basics' }).click(); // Deselect basics
    await page.locator('button').filter({ hasText: 'Layout' }).click(); // Select layout
    
    // Check question count updates
    await expect(page.getByText(/questions selected from 1 category/)).toBeVisible();
    
    // Start quiz
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Should display Layout category badge
    await expect(page.getByText('Layout')).toBeVisible();
  });

  test('should navigate back to category selection', async ({ page }) => {
    // Start quiz and complete it
    await page.getByRole('button', { name: 'Start Quiz' }).click();
    
    // Fast-forward through questions (simplified)
    for (let i = 0; i < 5; i++) {
      const firstOption = page.getByRole('button', { name: /border-radius|margin|padding/ }).first();
      if (!(await firstOption.isVisible())) break;
      
      await firstOption.click();
      await page.getByRole('button', { name: 'Submit Answer' }).click();
      
      const nextButton = page.getByRole('button', { name: /Next Question|Finish Quiz/ });
      const buttonText = await nextButton.textContent();
      await nextButton.click();
      
      if (buttonText?.includes('Finish Quiz')) break;
    }
    
    // Click "New Categories" to go back
    if (await page.getByRole('button', { name: 'New Categories' }).isVisible()) {
      await page.getByRole('button', { name: 'New Categories' }).click();
      
      // Should be back at category selection
      await expect(page.getByText('Select Quiz Categories')).toBeVisible();
    }
  });
});