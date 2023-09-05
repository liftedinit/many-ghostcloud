import { chromium, test, expect } from '@playwright/test'

test('has title', async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ ignoreHTTPSErrors: true })
  const page = await context.newPage()
  await page.goto('/')

  await expect(page).toHaveTitle(/GhostCloud/)

  const button = page.getByText('Get Started')

  await expect(button).toBeVisible()

  await browser.close()
})
