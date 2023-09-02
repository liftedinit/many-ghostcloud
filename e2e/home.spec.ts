import { chromium, test, expect } from '@playwright/test'

test('has title', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const context = await browser.newContext({ ignoreHTTPSErrors: true })
  const page = await context.newPage()
  await page.goto('https://localhost:3000')

  await expect(page).toHaveTitle(/GhostCloud/)

  const button = page.getByText('Get Started')

  await expect(button).toBeVisible()

  await browser.close()
})
