import {test} from '@playwright/test'

// Hook to run commands before each test
test.beforeEach(async ({page}) =>
{
  await page.goto('/')
  await page.getByText('Forms').click()  
})

// Not recommended to use the following:
// test.beforeAll()
// test.afterEach()
// test.afterAll() 

// "page" is a fixture 
test('the first test', async ({page}) => 
{
  await page.getByText('Form Layouts').click()
})

test('navigate to datepicker page', async ({page}) => 
{
  await page.getByText('Datepicker').click()
})

// Test suites
test.describe('test suite 1', () =>
{
  test('the second test', () => 
  { 

  })

})