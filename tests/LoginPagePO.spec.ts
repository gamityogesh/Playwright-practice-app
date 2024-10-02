import { expect, test } from '@playwright/test'
import { POManager } from '../pageObjects/POManager'
const dataset = JSON.parse(JSON.stringify(require('../test-Data/LoginPageTestData')))
let poManager: any
test.describe.configure({ mode: 'parallel' })
test.describe('Auth ', () => {
    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page)
        const dashboardPage = poManager.getDashboardPage()
        await dashboardPage.goto()
        await dashboardPage.navigateToAuth()
        await dashboardPage.navigateToLoginPage()
    })
    test('login with valid username and password', async ({ page }) => {
        const loginPage = poManager.getLoginPage()
        await loginPage.validUserLogin(dataset.username, dataset.password)
    })
    test('login with valid username and leaving empty password', async ({ page }) => {
        const loginPage = poManager.getLoginPage()
        await loginPage.invalidUserLoginVerifyError("test@test.com", "")
        await expect(page.locator(".caption")).toHaveText(" Password is required! ")
    })
    test('login with leaving empty username and valid password', async ({ page }) => {
        const loginPage = poManager.getLoginPage()
        await loginPage.invalidUserLoginVerifyError("", "qwerty")
        await expect(page.locator(".caption")).toHaveText(" Email is required! ")
    })
    test('login with wrong  username and valid password', async ({ page }) => {
        const loginPage = poManager.getLoginPage()
        await loginPage.invalidUserLoginVerifyError("test.te@gmail", "qwerty")
        await expect(page.locator(".caption")).toHaveText(" Email should be the real one! ")
    })
    test('login with valid  username and short password', async ({ page }) => {
        const loginPage = poManager.getLoginPage()
        await loginPage.invalidUserLoginVerifyError("test@gmail.com", "qwe")
        await expect(page.locator(".caption")).toHaveText("Password should contain from 4 to 50 characters")
    })
})