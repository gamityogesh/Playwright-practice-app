import { expect, Locator, Page, test } from '@playwright/test'
export class RegisterPage {
    readonly page: Page
    readonly fullUserName: Locator
    readonly username: Locator
    readonly password: Locator
    readonly confirmPassword: Locator
    readonly agree: Locator
    readonly btnRegister: Locator
    readonly errorMessage: Locator
    constructor(page: Page) {
        this.page = page
        this.fullUserName = page.locator("#input-name")
        this.username = page.locator("#input-email")
        this.password = page.locator("#input-password")
        this.confirmPassword = page.locator("#input-re-password")
        this.agree = page.locator(".custom-checkbox")
        this.btnRegister = page.locator("button:has-text(' Register ')")
        this.errorMessage = page.locator("p.caption")
    }
    async validUserRegister(fullUserName: string, username: string, password: string, confirmPassword: string) {
        await expect(this.btnRegister).toBeDisabled()
        await this.fullUserName.fill(fullUserName)
        await this.username.fill(username)
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
        await this.agree.click()
        await this.btnRegister.click()

    }
    async invalidUserRegister(fullUserName: string, username: string, password: string, confirmPassword: string) {
        await this.fullUserName.fill(fullUserName)
        await this.username.fill(username)
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
        await this.agree.click()
        await expect(this.btnRegister).toBeDisabled()
        await expect(this.errorMessage).toBeVisible()
    }

}