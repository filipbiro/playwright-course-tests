import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  // timeout: 10000,
  // globalTimeout: 60000,

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    //[allure-playwright],
    ['html']
  ],
  
  use: {    
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
          : process.env.STAGING == '1' ? 'http://localhost:4202'
          : 'http://localhost:4200',
    trace: 'on-first-retry',
    // actionTimeout: 5000,
    // navigationTimeout: 5000
    video: 
    {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [

    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
       },
    },

    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
