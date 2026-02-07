import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {
  if (!process.env.URL) {
    throw new Error("URL is missing.")
  }
  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
  const successButton = page.locator('.bg-success')

  // await successButton.click()

  // const text = await successButton.textContent()
  // await successButton.waitFor({state: "attached"})
  // const text = await successButton.allTextContents()
  
  // expect(text).toContain('Data loaded with AJAX get request.')

  // explicitely adding timeout
  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('alternative waits', async ({page}) => {
  const successButton = page.locator('.bg-success')

  // wait for element
  // await page.waitForSelector('.bg-success')

  // wait for particular response
  // await page.waitForResponse('https://uitestingplayground.com/ajaxdata')

  // wait for network calls to be completed (NOT RECOMMENDED)
  await page.waitForLoadState('networkidle')

  // wait for Timeout (NOT RECOMMENDED)
  // await page.waitForTimeout(50000)


  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('timeouts', async ({page}) => {
  // setting timeout for particular test
  // test.setTimeout(10000)

  // test.slow() - multiplies timeout by 3

  const successButton = page.locator('.bg-success')
  // this overrides timeout defined in playwright.config.ts
  await successButton.click({timeout: 16000})
})