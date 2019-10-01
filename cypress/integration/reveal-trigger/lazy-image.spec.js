const URL = '/iframe.html?id=revealtrigger--lazy-image'

describe('Reveal Trigger Lazy Image', function() {
  it('Checks if images load lazy', function() {
    cy.visit(URL)
    cy.get('[data-cy=lazy-image]')
      .should('have.class', '-preview')
      .should('have.attr', 'src', 'static/media/plaza_thumb.85e23e65.jpg?fit')
      .scrollIntoView()
      .should('not.have.class', '-preview')
      .should('have.attr', 'src', 'static/media/plaza.c320c522.jpg?fit')
  })
})
