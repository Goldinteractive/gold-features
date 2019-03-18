const URL = '/reveal-trigger-css-animation-types.html'

describe('Reveal Trigger', function() {
  it('properly fades in', function() {
    cy.visit(URL)
    cy.get('[data-cy=reveal-after]')
      .should('not.have.class', '-in')
      .scrollIntoView()
      .should('have.class', '-in')
  })
})
