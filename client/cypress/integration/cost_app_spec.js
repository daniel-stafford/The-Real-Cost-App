describe('Cost App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const user = {
      username: 'daniel',
      email: 'daniel.stafford@aalto.fi',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:8080/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('cost')
  })
  it('login form can be opened', function() {
    cy.get('[href="/login"]').click()
  })
})
