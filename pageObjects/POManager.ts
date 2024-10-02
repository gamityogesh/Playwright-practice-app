import { Page } from '@playwright/test'
import { DashboardPage } from './DashboardPage'
import { LoginPage } from './LoginPage'
export class POManager {
    readonly page: Page
    readonly dashboardPage: DashboardPage
    readonly loginPage: LoginPage
    constructor(page: Page) {
        this.page = page
        this.dashboardPage = new DashboardPage(this.page)
        this.loginPage = new LoginPage(this.page)
    }
    getDashboardPage() {
        return this.dashboardPage
    }
    getLoginPage() {
        return this.loginPage
    }
}