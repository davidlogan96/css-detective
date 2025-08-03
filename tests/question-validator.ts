import { test, expect, Page } from '@playwright/test';
import { Question } from './fixtures/test-quiz-data';

/**
 * Elegant question validation that works for any Question object
 * Tests the actual CSS logic, not just UI behavior
 */
export async function validateQuestion(page: Page, question: Question) {
  // Create a test page with elements for CSS testing
  await page.setContent(`
    <div id="demo-container" style="width: 200px; height: 200px; border: 1px solid #ccc; margin: 10px;">
      <div id="demo" style="width: 100%; height: 100%;"></div>
    </div>
    <div id="test-container" style="display: none;">
      ${question.options.map((_, i) => `<div id="test-${i}" style="width: 200px; height: 200px;"></div>`).join('')}
    </div>
  `);

  // Apply the question's demonstration style
  await page.locator('#demo').evaluate((el, style) => {
    Object.assign(el.style, style);
  }, question.style);

  // Test each answer option by applying its CSS
  const results = await page.evaluate((q) => {
    const demoEl = document.getElementById('demo')!;
    const demoStyle = window.getComputedStyle(demoEl);
    
    return q.options.map((option, index) => {
      const testEl = document.getElementById(`test-${index}`)!;
      
      // Parse CSS from the answer text (e.g., "border-radius: 1rem;" -> {borderRadius: '1rem'})
      const cssMatch = option.label.match(/([a-z-]+):\s*([^;]+)/g);
      if (cssMatch) {
        cssMatch.forEach(rule => {
          const [prop, value] = rule.split(':').map(s => s.trim());
          const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          (testEl.style as any)[camelProp] = value.replace(';', '');
        });
      }
      
      const testStyle = window.getComputedStyle(testEl);
      
      // Compare relevant CSS property based on question type
      const propertyMatches = compareStyleProperty(demoStyle, testStyle, q.property);
      
      return {
        optionIndex: index,
        isCorrect: option.isCorrect,
        cssMatches: propertyMatches,
        appliedCSS: option.label
      };
    });
  }, question);

  // Validation logic
  const correctAnswers = results.filter(r => r.isCorrect);
  const matchingAnswers = results.filter(r => r.cssMatches);
  
  // Assertions
  expect(correctAnswers.length).toBe(1); // Exactly one correct answer
  expect(matchingAnswers.length).toBeGreaterThanOrEqual(1); // At least one matching answer
  
  // The correct answer should be among the matching answers
  const correctAnswer = correctAnswers[0];
  const correctAnswerMatches = matchingAnswers.some(m => m.optionIndex === correctAnswer.optionIndex);
  
  if (!correctAnswerMatches) {
    console.error('Question validation failed:', {
      questionId: question.id,
      questionTitle: question.title,
      correctAnswer: correctAnswer.appliedCSS,
      matchingAnswers: matchingAnswers.map(m => results[m.optionIndex].appliedCSS),
      results
    });
  }
  
  expect(correctAnswerMatches).toBe(true);
}

// Helper function to compare specific CSS properties  
function compareStyleProperty(demoStyle: CSSStyleDeclaration, testStyle: CSSStyleDeclaration, property: string): boolean {
  console.log(`Comparing ${property}:`, { demo: (demoStyle as any)[property], test: (testStyle as any)[property] });
  switch (property) {
    case 'border-radius':
      return demoStyle.borderRadius === testStyle.borderRadius;
    case 'margin':
      return demoStyle.margin === testStyle.margin;
    case 'padding':
      return demoStyle.padding === testStyle.padding;
    case 'border':
      return demoStyle.border === testStyle.border;
    case 'transform':
      return demoStyle.transform === testStyle.transform;
    case 'filter':
      return demoStyle.filter === testStyle.filter;
    case 'opacity':
      return demoStyle.opacity === testStyle.opacity;
    case 'cursor':
      return demoStyle.cursor === testStyle.cursor;
    case 'box-shadow':
      return demoStyle.boxShadow === testStyle.boxShadow;
    case 'font-weight':
      return demoStyle.fontWeight === testStyle.fontWeight;
    case 'text-align':
      return demoStyle.textAlign === testStyle.textAlign;
    case 'background':
      return demoStyle.background === testStyle.background || 
             demoStyle.backgroundColor === testStyle.backgroundColor;
    case 'flexbox':
      return demoStyle.justifyContent === testStyle.justifyContent &&
             demoStyle.alignItems === testStyle.alignItems;
    case 'grid':
      return demoStyle.gridTemplateColumns === testStyle.gridTemplateColumns;
    default:
      return false;
  }
}

/**
 * Test factory that generates Playwright tests for all questions
 */
export function createQuestionTests(questions: Question[]) {
  questions.forEach(question => {
    test(`validate question: ${question.id} - ${question.title}`, async ({ page }) => {
      await validateQuestion(page, question);
    });
  });
}