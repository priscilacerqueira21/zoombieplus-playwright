const { expect } = require('@playwright/test')


export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
        //await this.page.locator('//button[text()="Entrar"]').click() XPATH
    }


    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

}

// Não faz parte da página de login
// async isLoggedIn() {
//     // Aguardando o carregamento após fazer login
//     await this.page.waitForLoadState('networkidle')
//     // Validando se a URL contém um texto admin após fazer login
//     await expect(this.page).toHaveURL(/.*admin/)
//     // Validação pelo ícone de logado
//     // const logoutLink = this.page.locator('a[href="/logout"]')
//     // await expect(logoutLink).toBeVisible()
// }