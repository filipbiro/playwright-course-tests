import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker} from '@faker-js/faker'

test.beforeEach(async({page}) =>
{
  await page.goto('/')
})

test('navigate to form page', async ({page}) =>
{
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datePickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({page}) =>
{
  const pm = new PageManager(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

  if (!process.env.USERNAME || !process.env.PASSWORD) 
    throw new Error('Missing USERNAME or PASSWORD')

  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
  await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
  //await pm.navigateTo().datePickerPage()
  //await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
  //await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6,15)
})