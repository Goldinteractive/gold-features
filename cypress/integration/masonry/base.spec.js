const URL = '/iframe.html?id=masonry--intro'

describe('Masonry', function() {
  it('Checks if items get appended', function() {
    cy.visit(URL)

    cy.get('[data-cy=append-button]').click()
    cy.get('[data-cy=appended1]').should('exist')
    cy.get('[data-cy=appended2]').should('exist')
    cy.get('[data-cy=appended3]').should('exist')
  })
})
