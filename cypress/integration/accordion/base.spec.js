const URL = '/iframe.html?id=accordion--intro'

describe('Accordion', function() {
  it('Checks if the Accordions work accordingly', function() {
    cy.visit(URL)

    cy.get('[data-cy=first-accordion-content]').should('be.visible')
    cy.get('[data-cy=first-accordion-header]').click()
    cy.get('[data-cy=first-accordion-content]').should('not.be.visible')

    cy.get('[data-cy=second-accordion-content]').should('not.be.visible')
    cy.get('[data-cy=second-accordion-header]').click()
    cy.get('[data-cy=second-accordion-content]').should('be.visible')
  })
})
