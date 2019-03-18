const URL = '/cookie-disclaimer-banner-types.html'

describe('Cookie Disclaimer', function() {
  it('properly appears per default', function() {
    cy.visit(URL)
    cy.get('[data-cy=ready]')
    cy.get('[data-cy=disclaimer]').should('have.class', '-show')
    cy.get('[data-cy=confirm]').click()
    cy.get('[data-cy=disclaimer]').should('not.have.class', '-show')
    cy.getCookie('disclaimeragreed').should('have.property', 'value', 'true')
  })
  it('does not appear if cookie is already set', function() {
    cy.setCookie('disclaimeragreed', 'true')
    cy.visit(URL)
    cy.get('[data-cy=ready]')
    cy.get('[data-cy=disclaimer]').should('not.have.class', '-show')
  })
})
