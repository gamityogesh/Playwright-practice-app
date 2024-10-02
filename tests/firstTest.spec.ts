import { test } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.locator("a[title='Forms']").click()
})
test('the first test', async ({ page }) => {
    await page.locator("a[title='Form Layouts']").click()

})
test('navigate to dataPicker page', async ({ page }) => {
    await page.locator("a[title='Datepicker']").click()

})
