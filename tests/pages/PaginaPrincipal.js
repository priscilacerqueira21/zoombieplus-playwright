// Classe que representa a página principal e
// E essa classe tem os steps de teste da página principal

const { expect } = require ('@playwright/test')


export class PaginaPrincipal {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
        
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()
    }


    async alertHaveText(target) { // alvo de validação - pode ser text simples ou array(lista)
        await expect(this.page.locator('.alert')).toHaveText(target)

    }

}