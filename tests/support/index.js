const { test: base, expect } = require('@playwright/test')

const { PaginaPrincipal } = require('../pages/PaginaPrincipal')
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')

const test = base.extend({
    // novo contexto do pw
    page: async ({ page }, use) => {
        await use({
            ...page,
            principal: new PaginaPrincipal(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }