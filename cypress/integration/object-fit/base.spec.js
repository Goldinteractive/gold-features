const URL = '/iframe.html?id=objectfit--intro'

describe('Object-fit', function() {
  it('Checks if images have correct styling', function() {
    cy.visit(URL)

    cy.get('[data-cy=image-container]')
      .should('not.have.class', '-initial-hide')
      .should('have.css', 'display', 'block')
      .should('have.css', 'position', 'absolute')
      .should('have.css', 'top', '0px')
      .should('have.css', 'left', '0px')

    cy.get('[data-cy=image]')
      .should('have.css', 'object-fit', 'cover')
      .should('have.css', 'object-position', '50% 50%')
  })
})
