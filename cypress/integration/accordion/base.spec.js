import { features, eventHub } from '@goldinteractive/js-base'

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
  it('Checks the eventHub-Integration', function() {
    cy.visit(URL)

    cy.get('[data-cy=first-accordion-content]').should('be.visible')
    cy.get('#demo-toggle').click()
    cy.get('[data-cy=first-accordion-content]').should('not.be.visible')
    cy.get('#fold-1-state').should($p => {
      expect($p).to.contain('closed')
      expect($p).to.not.contain('opened')
    })
    cy.get('#demo-toggle').click()
    cy.get('#fold-1-state').should($p => {
      expect($p).to.contain('opened')
      expect($p).to.not.contain('closed')
    })
    cy.get('[data-cy=first-accordion-content]').should('be.visible')
  })
})
