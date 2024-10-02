import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200", { waitUntil: 'commit' })
})
test.describe('Form layout page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4200", { waitUntil: 'commit' })
        await page.locator("a[title='Forms']").click()
        await page.locator("a[title='Form Layouts']").click()
    })
    test("input fields Using the Grid", async ({ page }) => {
        await page.locator("#inputEmail1").fill("yogesh")
        await page.locator("#inputPassword2").fill("yogesh")
        await page.locator("button:has-text('SIGN IN')").first().click()
        await expect(page.locator("#inputEmail1")).toHaveValue("yogesh")
        await expect(page.locator("#inputPassword2")).toHaveValue("yogesh")
    })
    test('input fields Inline form', async ({ page }) => {
        await page.locator("input[placeholder='Jane Doe']").fill("yogesh")
        await expect(page.locator("input[placeholder='Jane Doe']")).toHaveValue("yogesh")
        await page.locator("input[placeholder='Email'][type='text']").fill("qwerty")
        await expect(page.locator("input[placeholder='Email'][type='text']")).toHaveValue("qwerty")
        await page.getByText("Remember me").first().check()
        await expect(page.getByText("Remember me").first()).toBeChecked()
        await page.locator("button:has-text('SUBMIT')").first().click()
    })
    test("Radios buttons ", async ({ page }) => {
        await page.getByText("Option 1").check()
        await expect(page.getByText("Option 1")).toBeChecked()
        expect(await page.getByText("Option 2").isChecked()).toBeFalsy()
        await expect(page.getByText("Disabled Option")).toBeDisabled()
    })

})
test('checkbox', async ({ page }) => {
    await page.locator("[title*='Modal']").click()
    await page.locator("a[title='Toastr']").click()
    await page.getByText("Hide on click").uncheck()
    await page.getByText("Prevent arising of duplicate toast").check()
    const allBoxes = page.locator("[type='checkbox']")
    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }
    // dropdown
    await page.locator(".form-group .select-button").last().click()
    const optionList = page.locator(".option-list .ng-star-inserted")
    await expect(optionList).toHaveText(["primary", "success", "infoo", "warning", "danger"])
})
test('List and Dropdowns', async ({ page }) => {
    const dropdownMenu = page.locator(".header-container .select-button")
    await dropdownMenu.click()
    const optionList = page.locator(".option-list .ng-star-inserted")
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({ hasText: 'Cosmic' }).click()
    const header = page.locator("nb-layout-header")
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropdownMenu.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != 'Corporate')
            await dropdownMenu.click()

    }

})
test.describe('auth page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4200", { waitUntil: 'commit' })
        await page.locator("a[title='Auth']").click()

    })
    test("login page", async ({ page }) => {
        await page.locator("a[title='Login']").click()
        await expect(page.locator("#title")).toBeVisible()
        await page.locator("#input-email").fill("abc@test.com")
        await page.locator("#input-password").fill("abc@test")
        await page.locator(".custom-checkbox").check()
        await expect(page.locator("#input-email")).toHaveValue("abc@test.com")
        await expect(page.locator("#input-password")).toHaveValue("abc@test")
        await expect(page.locator(".custom-checkbox")).toBeChecked()
        await page.locator("button").click()


    })
})
test('Tooltip', async ({ page }) => {
    await page.locator("[title*='Modal']").click()
    await page.locator("a[title='Tooltip']").click()
    await page.locator("button:has-text('TOP')").hover()
    const tooltip = await page.locator(".cdk-overlay-pane .content span").textContent()
    expect(tooltip).toEqual("This is a tooltip")
    await page.locator("button:has-text('Primary')").hover()
    const tooltipBtn = await page.locator(".cdk-overlay-pane .content span").textContent()
    expect(tooltipBtn).toEqual("This is a tooltip")
})
test('Dialog Boxes', async ({ page }) => {
    await page.locator("[title*='Tables & Data']").click()
    await page.locator("a[title='Smart Table']").click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })
    await page.locator(".nb-trash").first().click()
    await expect(page.locator('table tr td').first()).not.toHaveText("mdo@gmail.com")
})
test('web table', async ({ page }) => {
    //1 get the row by any test in this row
    await page.locator("[title*='Tables & Data']").click()
    await page.locator("a[title='Smart Table']").click()
    // const targetRow = page.locator("tbody tr:has-text('twitter@outlook.com')")
    // await targetRow.locator(".nb-edit").click()
    // await page.locator("[placeholder='Age']").last().clear()
    // await page.locator("[placeholder='Age']").last().fill("35")
    // await page.locator(".nb-checkmark").click()

    // 2 get the row based on the value in the specific column
    await page.locator(".ng2-smart-pagination-nav:has-text('2')").click()
    const targetRowById = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText("11") })
    await targetRowById.locator(".nb-edit").click()
    await page.locator("[placeholder='E-mail']").last().clear()
    await page.locator("[placeholder='E-mail']").last().fill("test@test.com")
    await page.locator(".nb-checkmark").click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText("test@test.com")


})





