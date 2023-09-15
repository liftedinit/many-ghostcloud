import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/GhostCloud/)

  const button = page.getByText('Get Started')

  await expect(button).toBeVisible()
})
