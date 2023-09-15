import { devices } from '@playwright/test'
import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  maxFailures: 1,
  use: {
    headless: true,
    baseURL: 'https://localhost:3000',
    viewport: null,
    ignoreHTTPSErrors: true,
  },
  workers: process.env.CI ? 1 : undefined,
  reporter: [['junit', { outputFile: 'test-reports/results.xml' }]],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'iphone12-promax',
      use: {
        ...devices['iPhone 12 Pro Max'],
      },
    },
    {
      name: 'pixel-5',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run start',
    url: 'https://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
}
export default config
