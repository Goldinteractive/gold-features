const URL = '/iframe.html?id=gallery--intro'

describe('Gallery', function() {
  it('Checks if gallery opens correctly', function() {
    cy.visit(URL)

    cy.get('[data-cy=image1]').click()
    cy.get('[data-cy=gallery]').should('be.visible')
  })
})
