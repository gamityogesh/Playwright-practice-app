import { Page } from '@playwright/test'
import { DashboardPage } from './DashboardPage'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'
export class POManager {
    readonly page: Page
    readonly dashboardPage: DashboardPage
    readonly loginPage: LoginPage
    readonly registerPage: RegisterPage
    constructor(page: Page) {
        this.page = page
        this.dashboardPage = new DashboardPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.registerPage = new RegisterPage(this.page)
    }
    getDashboardPage() {
        return this.dashboardPage
    }
    getLoginPage() {
        return this.loginPage
    }
    getRegisterPage() {
        return this.registerPage
    }
}