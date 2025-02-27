const { test, expect }  = require('../support')
const { faker } = require('@faker-js/faker')


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm(leadName, leadEmail)
  
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
})

test('não deve cadastrar quando o email já existe', async ({ page, request}) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  //Pré cadastradar um lead para já ter um cadastro e testar e esse cenario duplicado

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
//Validando status code de sucesso
  expect(newLead.ok()).toBeTruthy()
  
  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm(leadName, leadEmail)
  
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
})


test('não deve cadastrar com email incorreto', async ({ page }) => {

  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm('Aiala Priscila', 'aiala.com.br')

  await page.principal.alertHaveText('Email incorreto')

})


test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm('', 'aiala.priscila@gmail.com')

  await page.principal.alertHaveText('Campo obrigatório')
})


test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm('Aiala Priscila', '')

  await page.principal.alertHaveText('Campo obrigatório')
})


test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {

  await page.principal.visit()
  await page.principal.openLeadModal()
  await page.principal.submitLeadForm('', '')

  await page.principal.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})