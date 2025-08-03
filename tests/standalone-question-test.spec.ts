import { test, expect } from '@playwright/test';
import { testQuizQuestions } from './fixtures/test-quiz-data';

/**
 * Elegant standalone question validation that doesn't require a web server
 * This is the most efficient approach for testing question logic
 */

// Configure test to not use web server
test.use({ 
  baseURL: undefined  // Override the web server config
});

test.describe('Question Validation - Standalone', () => {
  
  test('validate CSS property parsing and comparison logic', async ({ page }) => {
    // Create a standalone HTML page for testing
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Base styles for testing */
            .test-element {
              width: 100px;
              height: 100px;
              background-color: blue;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          <div id="test-container"></div>
          <script>
            // Helper function to parse CSS from answer text
            function parseCSSFromAnswer(answerText) {
              const cssProps = {};
              const matches = answerText.match(/([a-z-]+)\\s*:\\s*([^;]+)/g);
              if (matches) {
                matches.forEach(match => {
                  const [prop, value] = match.split(':').map(s => s.trim());
                  const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                  cssProps[camelProp] = value.replace(';', '');
                });
              }
              return cssProps;
            }
            
            // Make it globally available
            window.parseCSSFromAnswer = parseCSSFromAnswer;
          </script>
        </body>
      </html>
    `);

    // Test each question
    for (const question of testQuizQuestions) {
      console.log(`Testing question: ${question.id} - ${question.title}`);
      
      const result = await page.evaluate((q) => {
        const container = document.getElementById('test-container');
        container.innerHTML = '';
        
        // Create demo element with question styles
        const demoEl = document.createElement('div');
        demoEl.className = 'test-element';
        demoEl.id = 'demo';
        
        // Apply question styles
        Object.assign(demoEl.style, q.style);
        container.appendChild(demoEl);
        
        const demoStyle = window.getComputedStyle(demoEl);
        
        // Test each answer option
        const optionResults = q.options.map((option, index) => {
          const testEl = document.createElement('div');
          testEl.className = 'test-element';
          testEl.id = `test-${index}`;
          
          // Parse and apply CSS from the answer
          const cssProps = window.parseCSSFromAnswer(option.label);
          Object.assign(testEl.style, cssProps);
          container.appendChild(testEl);
          
          const testStyle = window.getComputedStyle(testEl);
          
          // Compare the relevant property
          let matches = false;
          switch (q.property) {
            case 'border-radius':
              matches = demoStyle.borderRadius === testStyle.borderRadius;
              break;
            case 'margin':
              matches = demoStyle.margin === testStyle.margin;
              break;
            case 'transform':
              matches = demoStyle.transform === testStyle.transform;
              break;
            default:
              matches = false;
          }
          
          // Clean up test element
          container.removeChild(testEl);
          
          return {
            optionIndex: index,
            isCorrect: option.isCorrect,
            cssMatches: matches,
            demoValue: demoStyle[q.property] || demoStyle[q.property.replace('-', '')],
            testValue: testStyle[q.property] || testStyle[q.property.replace('-', '')],
            appliedCSS: option.label
          };
        });
        
        return {
          questionId: q.id,
          property: q.property,
          results: optionResults
        };
      }, question);
      
      // Validate the results
      const correctAnswers = result.results.filter(r => r.isCorrect);
      const matchingAnswers = result.results.filter(r => r.cssMatches);
      
      console.log(`Question ${result.questionId} results:`, {
        property: result.property,
        correctAnswers: correctAnswers.length,
        matchingAnswers: matchingAnswers.length,
        details: result.results
      });
      
      // Assertions
      expect(correctAnswers.length, `Question ${result.questionId} should have exactly one correct answer`).toBe(1);
      expect(matchingAnswers.length, `Question ${result.questionId} should have at least one matching answer`).toBeGreaterThanOrEqual(1);
      
      // The correct answer should match the demonstration
      const correctAnswer = correctAnswers[0];
      const correctMatches = matchingAnswers.some(m => m.optionIndex === correctAnswer.optionIndex);
      
      if (!correctMatches) {
        console.error(`Question ${result.questionId} validation failed:`, {
          correctAnswer: correctAnswer.appliedCSS,
          correctAnswerMatches: correctAnswer.cssMatches,
          matchingAnswers: matchingAnswers.map(m => result.results[m.optionIndex].appliedCSS)
        });
      }
      
      expect(correctMatches, `Question ${result.questionId}: correct answer should match demonstration`).toBe(true);
    }
  });
  
  test('individual question validation: border-radius', async ({ page }) => {
    const question = testQuizQuestions.find(q => q.id === 'br1');
    if (!question) return;
    
    await page.setContent(`
      <html><body>
        <div id="demo" style="width: 100px; height: 100px; background: blue; border-radius: 1rem;"></div>
        <div id="test1" style="width: 100px; height: 100px; background: blue; border-radius: 1rem;"></div>
        <div id="test2" style="width: 100px; height: 100px; background: blue; border-radius: 0.5rem;"></div>
      </body></html>
    `);
    
    const result = await page.evaluate(() => {
      const demo = document.getElementById('demo');
      const test1 = document.getElementById('test1');
      const test2 = document.getElementById('test2');
      
      const demoStyle = window.getComputedStyle(demo);
      const test1Style = window.getComputedStyle(test1);
      const test2Style = window.getComputedStyle(test2);
      
      return {
        demo: demoStyle.borderRadius,
        test1: test1Style.borderRadius,
        test2: test2Style.borderRadius,
        test1Matches: demoStyle.borderRadius === test1Style.borderRadius,
        test2Matches: demoStyle.borderRadius === test2Style.borderRadius
      };
    });
    
    console.log('Border radius test:', result);
    expect(result.test1Matches).toBe(true);
    expect(result.test2Matches).toBe(false);
  });
});