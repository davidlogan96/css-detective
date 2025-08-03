import { test, expect } from '@playwright/test';
import { testAnyQuestion, testQuestions, generateTestReport } from './utils/question-tester';

// Import individual questions to avoid lucide-react issues
const sampleQuestions = [
  {
    id: 'br1',
    category: 'basics',
    title: 'Guess That Curve',
    property: 'border-radius',
    description: "Which border-radius value creates this shape?",
    style: { 
      width: '10rem',
      height: '10rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      borderRadius: '1rem' 
    },
    options: [
      { label: 'border-radius: 0.5rem;', isCorrect: false },
      { label: 'border-radius: 1rem;', isCorrect: true },
      { label: 'border-radius: 2rem;', isCorrect: false },
      { label: 'border-radius: 50%;', isCorrect: false },
    ],
  },
  {
    id: 'o1',
    category: 'effects',
    title: 'Ghost Mode',
    property: 'opacity',
    description: 'This element appears partially faded. Which value creates this transparency level?',
    style: { 
      width: '10rem',
      height: '10rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      borderRadius: '1rem', 
      opacity: 0.6 
    },
    options: [
      { label: 'opacity: 0.2;', isCorrect: false },
      { label: 'opacity: 0.8;', isCorrect: false },
      { label: 'opacity: 0.6;', isCorrect: true },
      { label: 'opacity: 1;', isCorrect: false },
    ],
  }
];

/**
 * Demonstration of elegant question testing for any Question object
 * This shows how to use the testing system with real quiz data
 */

// Override base URL to avoid web server dependency
test.use({ baseURL: undefined });

test.describe('Full Quiz Validation System', () => {
  
  test('validate individual question with detailed reporting', async ({ page }) => {
    const question = sampleQuestions[0]; // border-radius question
    
    const result = await testAnyQuestion(page, question);
    
    console.log(`\n🎯 Testing: ${result.title}`);
    console.log(`📊 Result: ${result.valid ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`🔍 Property: ${result.property}`);
    console.log(`📝 Details:`, {
      correctAnswers: result.details.correctAnswers,
      matchingAnswers: result.details.matchingAnswers,
      options: result.details.optionResults.map(opt => ({
        answer: opt.appliedCSS,
        correct: opt.isCorrect,
        matches: opt.cssMatches,
        values: `${opt.demoValue} vs ${opt.testValue}`
      }))
    });
    
    expect(result.valid).toBe(true);
    expect(result.details.correctAnswers).toBe(1);
    expect(result.details.matchingAnswers).toBeGreaterThanOrEqual(1);
  });
  
  test('batch validate multiple questions', async ({ page }) => {
    const results = await testQuestions(page, sampleQuestions);
    
    const report = generateTestReport(results);
    console.log(report);
    
    // All sample questions should pass
    const passedCount = results.filter(r => r.valid).length;
    expect(passedCount).toBe(sampleQuestions.length);
  });
  
  test('test question creation and validation workflow', async ({ page }) => {
    // Example: Creating a new question and testing it
    const newQuestion = {
      id: 'test-shadow',
      category: 'effects',
      title: 'Drop Shadow',
      property: 'box-shadow',
      description: 'Which box-shadow creates this effect?',
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      options: [
        { label: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);', isCorrect: false },
        { label: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);', isCorrect: true },
        { label: 'box-shadow: 0 8px 12px rgba(0,0,0,0.1);', isCorrect: false },
        { label: 'box-shadow: inset 0 0 10px rgba(0,0,0,0.2);', isCorrect: false }
      ]
    };
    
    const result = await testAnyQuestion(page, newQuestion);
    
    console.log(`\n🔨 Testing New Question: ${result.title}`);
    console.log(`📊 Validation: ${result.valid ? '✅ VALID' : '❌ INVALID'}`);
    
    if (!result.valid) {
      console.log(`❌ Error: ${result.error}`);
      console.log(`📋 Details:`, result.details.optionResults);
    }
    
    expect(result.valid).toBe(true);
  });
  
  test('demonstrate error detection with invalid question', async ({ page }) => {
    // Example of a question with incorrect answer marking
    const invalidQuestion = {
      id: 'invalid-test',
      title: 'Invalid Question',
      property: 'border-radius',
      style: { borderRadius: '10px', width: '100px', height: '100px', backgroundColor: 'blue' },
      options: [
        { label: 'border-radius: 10px;', isCorrect: false }, // This should be correct but is marked false
        { label: 'border-radius: 5px;', isCorrect: true },   // This should be incorrect but is marked true
      ]
    };
    
    const result = await testAnyQuestion(page, invalidQuestion);
    
    console.log(`\n🚨 Testing Invalid Question: ${result.title}`);
    console.log(`📊 Expected Failure: ${!result.valid ? '✅ CORRECTLY DETECTED' : '❌ MISSED ERROR'}`);
    
    if (!result.valid) {
      console.log(`✅ System correctly identified the issue: ${result.error}`);
    }
    
    // Should fail validation because the correct answer doesn't match the demonstration
    expect(result.valid).toBe(false);
  });
});

/**
 * USAGE EXAMPLES:
 * 
 * // Test a single question:
 * const result = await testAnyQuestion(page, myQuestion);
 * 
 * // Test multiple questions:
 * const results = await testQuestions(page, myQuestions);
 * 
 * // Generate report:
 * const report = generateTestReport(results);
 * console.log(report);
 */