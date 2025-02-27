const { expect } = require('@playwright/test')


// Componente de toast 
export class Toast {

    constructor (page) {
        this.page = page
    }


    async containText(message) {
        // Espera que tenha o elemento toast e a mensagem e que esteja invisivel
        // Em até 5 segundos

        const toast = this.page.locator('.toast')

        await expect(toast).toContainText(message)
        await expect(toast).not.toBeVisible({timeout: 5000})
    }
}