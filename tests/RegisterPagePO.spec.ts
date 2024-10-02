import { expect, test } from '@playwright/test'
import { POManager } from '../pageObjects/POManager'
const dataset = JSON.parse(JSON.stringify(require('../test-Data/registerPagePOTestData')))
let poManager: any
let dashboardPage: any
test.describe('Auth ', () => {
    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page)
        dashboardPage = poManager.getDashboardPage()
        await dashboardPage.goto()
        await dashboardPage.navigateToAuth()
        await dashboardPage.navigateToRegisterPage()
    })
    test('Sign Up with valid user credential ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.validUserRegister(dataset.fullUserName, dataset.username, dataset.password, dataset.confirmPassword)
    })
    test('Sign Up with empty username and fill all other field with valid data ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.invalidUserRegister(dataset.fullUserName, "", dataset.password, dataset.confirmPassword)
        await expect(page.locator(".caption")).toHaveText(" Email is required! ")
    })
    test('Sign Up with empty password and fill all other field with valid data ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.invalidUserRegister(dataset.fullUserName, dataset.username, "", dataset.confirmPassword)
        await expect(page.locator(".caption")).toHaveText("Password is required!")
    })
    test('Sign Up with empty confirm password and fill all other field with valid data ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.invalidUserRegister(dataset.fullUserName, dataset.username, dataset.password, "")
        await expect(page.locator(".caption")).toHaveText(" Password confirmation is required! ")
    })
    test('Sign Up with wrong email address and fill all other field with valid data ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.invalidUserRegister(dataset.fullUserName, "testgmail.com", dataset.password, dataset.confirmPassword)
        await expect(page.locator(".caption")).toHaveText("  Email should be the real one!  ")
    })
    test('Sign Up with password less than 4 characters and fill all other field with valid data ', async ({ page }) => {
        const registerPage = poManager.getRegisterPage()
        await registerPage.invalidUserRegister(dataset.fullUserName, dataset.username, "qwe", dataset.confirmPassword)
        await expect(page.locator(".caption")).toHaveText(" Password should contain from 4 to 50 characters ")
    })

})