const URL = '/iframe.html?id=headroom--intro'

describe('Headroom', function() {
  it('Checks if header hides correctly on scroll', function() {
    cy.visit(URL)

    cy.scrollTo(0, 20)
    cy.get('[data-cy=element]').should('not.be.visible')
    cy.get('[data-cy=header]').should('not.have.class', '-top')
    cy.get('[data-cy=header]').should('have.class', '-not-top')
  })
})
