import { expect, Locator, Page, test } from '@playwright/test'
export class LoginPage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly rememberMe: Locator
    readonly btnLogin: Locator
    readonly errorMessage: Locator
    constructor(page: Page) {
        this.page = page
        this.username = page.locator("#input-email")
        this.password = page.locator("#input-password")
        this.rememberMe = page.locator(".custom-checkbox")
        this.btnLogin = page.locator("button:has-text('LOG IN')")
        this.errorMessage = page.locator("p.caption")
    }
    async validUserLogin(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.rememberMe.click()
        await this.btnLogin.click()
    }
    async invalidUserLoginVerifyError(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.rememberMe.click()
        await expect(this.btnLogin).toBeDisabled()
        await expect(this.errorMessage).toBeVisible()
    }
}