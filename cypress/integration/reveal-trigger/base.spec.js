const URL = '/iframe.html?id=revealtrigger--css-animation'

describe('Reveal Trigger', function() {
  it('properly fades in', function() {
    cy.visit(URL)
    cy.get('[data-cy=reveal-after]')
      .first()
      .should('not.have.class', '-in')
      .scrollIntoView()
      .should('have.class', '-in')
  })
})
