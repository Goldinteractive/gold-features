const URL = '/element-loader-types.html'

describe('Element Loader', function() {
  it('properly loads elements', function() {
    cy.visit(URL)

    cy.get('[data-cy=loader]').should('exist')

    cy.get('[data-cy=feature-content]').should('exist')

    cy.get('[data-cy=inlined]').should('exist')

    cy.get('[data-cy=deferred]').should('not.exist')
    cy.get('[data-cy=load-element]').click()
    cy.get('[data-cy=deferred]').should('exist')
  })
})
