const { test } = require('../support') // index default
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

 
test('deve poder cadastrar um novo filme',  async ({page})=> {
    
    // é importante estar logado

    const movie = data.create
 
    // antes de acessar a aplicação web,
    //  ele já garante que a massa de teste não existe pra não ter duplicidade

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')

})
