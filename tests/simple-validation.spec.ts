import { test, expect } from '@playwright/test';

/**
 * Simple validation test without web server dependency
 * Tests the core CSS comparison logic
 */
test('CSS property parsing and comparison', async ({ page }) => {
  // Create a simple test page without external dependencies
  await page.setContent(`
    <html>
      <head><style>
        .demo { width: 100px; height: 100px; background: blue; }
        .test1 { width: 100px; height: 100px; background: blue; border-radius: 1rem; }
        .test2 { width: 100px; height: 100px; background: blue; border-radius: 0.5rem; }
      </style></head>
      <body>
        <div id="demo" class="demo" style="border-radius: 1rem;"></div>
        <div id="test1" class="test1"></div>
        <div id="test2" class="test2"></div>
      </body>
    </html>
  `);

  // Test CSS comparison logic
  const results = await page.evaluate(() => {
    const demo = document.getElementById('demo')!;
    const test1 = document.getElementById('test1')!;
    const test2 = document.getElementById('test2')!;
    
    const demoStyle = window.getComputedStyle(demo);
    const test1Style = window.getComputedStyle(test1);
    const test2Style = window.getComputedStyle(test2);
    
    return {
      demoBorderRadius: demoStyle.borderRadius,
      test1BorderRadius: test1Style.borderRadius,
      test2BorderRadius: test2Style.borderRadius,
      test1Matches: demoStyle.borderRadius === test1Style.borderRadius,
      test2Matches: demoStyle.borderRadius === test2Style.borderRadius
    };
  });

  console.log('CSS comparison results:', results);
  
  expect(results.test1Matches).toBe(true);
  expect(results.test2Matches).toBe(false);
});