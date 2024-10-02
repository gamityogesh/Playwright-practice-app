import { expect, Locator, Page } from '@playwright/test'
export class DashboardPage {
    readonly page: Page
    readonly authLink: Locator
    readonly loginLink: Locator
    readonly registerLink: Locator
    readonly requestPasswordLink: Locator
    readonly resetPasswordLink: Locator
    constructor(page: Page) {
        this.page = page
        this.authLink = page.locator("a[title='Auth']")
        this.loginLink = page.locator("a[title='Login']")
        this.registerLink = page.locator("a[title='Register']")
        this.requestPasswordLink = page.locator("a[title='Request Password']")
        this.resetPasswordLink = page.locator("a[title='Reset Password']']")
    }
    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' })
    }
    async navigateToAuth() {
        await this.authLink.click()
    }
    async navigateToLoginPage() {
        await this.loginLink.click()
    }
    async navigateToRegisterPage() {
        await this.registerLink.click()
    }
    async navigateToRequestPasswordPage() {
        await this.requestPasswordLink.click()
    }
    async navigateToResetPasswordPage() {
        await this.resetPasswordLink.click()
    }
}