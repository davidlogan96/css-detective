import { Page } from '@playwright/test';

/**
 * Elegant question testing utility that works with any Question object
 * This is the core testing logic that can be used anywhere
 */

export interface QuestionTestResult {
  questionId: string;
  title: string;
  property: string;
  valid: boolean;
  error?: string;
  details: {
    correctAnswers: number;
    matchingAnswers: number;
    optionResults: Array<{
      index: number;
      isCorrect: boolean;
      cssMatches: boolean;
      appliedCSS: string;
      demoValue: string;
      testValue: string;
    }>;
  };
}

export async function testAnyQuestion(page: Page, question: any): Promise<QuestionTestResult> {
  try {
    // Create standalone test environment
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
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
            window.parseCSSFromAnswer = parseCSSFromAnswer;
          </script>
        </body>
      </html>
    `);

    // Test the question
    const result = await page.evaluate((q) => {
      const container = document.getElementById('test-container');
      container.innerHTML = '';
      
      // Create demo element
      const demoEl = document.createElement('div');
      demoEl.className = 'test-element';
      Object.assign(demoEl.style, q.style);
      container.appendChild(demoEl);
      
      const demoStyle = window.getComputedStyle(demoEl);
      
      // Test each answer option
      const optionResults = q.options.map((option, index) => {
        const testEl = document.createElement('div');
        testEl.className = 'test-element';
        
        // Parse and apply CSS
        const cssProps = window.parseCSSFromAnswer(option.label);
        Object.assign(testEl.style, cssProps);
        container.appendChild(testEl);
        
        const testStyle = window.getComputedStyle(testEl);
        
        // Compare relevant property
        let matches = false;
        let demoValue = '';
        let testValue = '';
        
        switch (q.property) {
          case 'border-radius':
            demoValue = demoStyle.borderRadius;
            testValue = testStyle.borderRadius;
            matches = demoValue === testValue;
            break;
          case 'margin':
            demoValue = demoStyle.margin;
            testValue = testStyle.margin;
            matches = demoValue === testValue;
            break;
          case 'padding':
            demoValue = demoStyle.padding;
            testValue = testStyle.padding;
            matches = demoValue === testValue;
            break;
          case 'transform':
            demoValue = demoStyle.transform;
            testValue = testStyle.transform;
            matches = demoValue === testValue;
            break;
          case 'filter':
            demoValue = demoStyle.filter;
            testValue = testStyle.filter;
            matches = demoValue === testValue;
            break;
          case 'opacity':
            demoValue = demoStyle.opacity;
            testValue = testStyle.opacity;
            matches = demoValue === testValue;
            break;
          case 'box-shadow':
            demoValue = demoStyle.boxShadow;
            testValue = testStyle.boxShadow;
            matches = demoValue === testValue;
            break;
          case 'font-weight':
            demoValue = demoStyle.fontWeight;
            testValue = testStyle.fontWeight;
            matches = demoValue === testValue;
            break;
          case 'text-align':
            demoValue = demoStyle.textAlign;
            testValue = testStyle.textAlign;
            matches = demoValue === testValue;
            break;
          case 'background':
            demoValue = demoStyle.background;
            testValue = testStyle.background;
            matches = demoValue === testValue;
            break;
          case 'border':
            demoValue = demoStyle.border;
            testValue = testStyle.border;
            matches = demoValue === testValue;
            break;
          case 'cursor':
            demoValue = demoStyle.cursor;
            testValue = testStyle.cursor;
            matches = demoValue === testValue;
            break;
          case 'flexbox':
            demoValue = `${demoStyle.justifyContent}|${demoStyle.alignItems}`;
            testValue = `${testStyle.justifyContent}|${testStyle.alignItems}`;
            matches = demoValue === testValue;
            break;
          case 'grid':
            demoValue = demoStyle.gridTemplateColumns;
            testValue = testStyle.gridTemplateColumns;
            matches = demoValue === testValue;
            break;
          default:
            matches = false;
        }
        
        container.removeChild(testEl);
        
        return {
          index,
          isCorrect: option.isCorrect,
          cssMatches: matches,
          appliedCSS: option.label,
          demoValue,
          testValue
        };
      });
      
      return {
        questionId: q.id,
        title: q.title,
        property: q.property,
        optionResults
      };
    }, question);

    // Validate results
    const correctAnswers = result.optionResults.filter(r => r.isCorrect);
    const matchingAnswers = result.optionResults.filter(r => r.cssMatches);
    const correctMatches = correctAnswers.some(ca => 
      matchingAnswers.some(ma => ma.index === ca.index)
    );

    const valid = correctAnswers.length === 1 && 
                  matchingAnswers.length >= 1 && 
                  correctMatches;

    return {
      questionId: result.questionId,
      title: result.title,
      property: result.property,
      valid,
      error: valid ? undefined : 'Validation failed: correct answer does not match demonstration',
      details: {
        correctAnswers: correctAnswers.length,
        matchingAnswers: matchingAnswers.length,
        optionResults: result.optionResults
      }
    };

  } catch (error) {
    return {
      questionId: question.id || 'unknown',
      title: question.title || 'unknown',
      property: question.property || 'unknown',
      valid: false,
      error: error instanceof Error ? error.message : String(error),
      details: {
        correctAnswers: 0,
        matchingAnswers: 0,
        optionResults: []
      }
    };
  }
}

/**
 * Utility to batch test multiple questions
 */
export async function testQuestions(page: Page, questions: any[]): Promise<QuestionTestResult[]> {
  const results: QuestionTestResult[] = [];
  
  for (const question of questions) {
    const result = await testAnyQuestion(page, question);
    results.push(result);
  }
  
  return results;
}

/**
 * Generate a summary report of test results
 */
export function generateTestReport(results: QuestionTestResult[]): string {
  const passed = results.filter(r => r.valid).length;
  const failed = results.filter(r => !r.valid).length;
  
  let report = `\n📊 Quiz Question Validation Report\n`;
  report += `✅ Passed: ${passed}\n`;
  report += `❌ Failed: ${failed}\n`;
  report += `📈 Success Rate: ${((passed / results.length) * 100).toFixed(1)}%\n\n`;
  
  if (failed > 0) {
    report += `Failed Questions:\n`;
    results.filter(r => !r.valid).forEach(result => {
      report += `  • ${result.questionId}: ${result.title} - ${result.error}\n`;
    });
  }
  
  return report;
}