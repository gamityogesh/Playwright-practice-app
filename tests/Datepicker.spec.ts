import { expect, test } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200", { waitUntil: 'commit' })
    await page.locator("a[title='Forms']").click()
    await page.locator("a[title='Datepicker']").click()
})
test('Common Datepicker', async ({ page }) => {
    const DD = "10"
    const MM = "04"
    const YY = "2024"
    await page.locator("input[placeholder='Form Picker']").click()
    await page.locator(".calendar-navigation button.nb-transition").first().click()
    await page.locator(".cell-content:has-text('" + YY + "')").click()
    await page.locator(".cell-content").nth(Number(MM) - 1).click()
    await page.locator(".cell-content:has-text('" + DD + "')").first().click()
    await expect(page.locator(".ng-star-inserted input").first()).toHaveValue("Apr 10, 2024")
})
test('Datepicker With Range', async ({ page }) => {
    const startDate = "10"
    const startMonth = "6"
    const startYear = "1993"
    const endDate = "10"
    const endMonth = "9"
    const endYear = "2024"
    await page.locator("input[placeholder='Range Picker']").click()
    await page.locator(".calendar-navigation button.nb-transition").first().click()
    await page.locator(".prev-month").click()
    await page.locator(".prev-month").click()
    await page.locator(".cell-content:has-text('" + startYear + "')").click()
    await page.locator(".cell-content").nth(Number(Number(startMonth) - 1)).click()
    await page.locator(".cell-content:has-text('" + startDate + "')").click()
    await page.locator(".calendar-navigation button.nb-transition").first().click()
    await page.locator(".next-month").click()
    await page.locator(".next-month").click()
    await page.locator(".cell-content:has-text('" + endYear + "')").click()
    await page.locator(".cell-content").nth(Number(Number(endMonth) - 1)).click()
    await page.locator(".cell-content:has-text('" + endDate + "')").click()
    await expect(page.locator(".ng-star-inserted input").nth(1)).toHaveValue("Jun 10, 1993 - Sep 10, 2024")
})
test('Datepicker With Disabled Min Max Values', async ({ page }) => {
    await page.locator("[placeholder*='Min Max ']").click()

    const Date = "27"
    await page.locator(".cell-content:has-text('" + Date + "')").click()
    await expect(page.locator(".ng-star-inserted input").last()).toHaveValue("Sep 27, 2024")
})

