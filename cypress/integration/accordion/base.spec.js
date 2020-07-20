import { features, eventHub } from '@goldinteractive/js-base'

const URL = '/iframe.html?id=accordion--intro'
const HASH_URL =
  '/iframe.html?id=accordion--open-fold-by-url-hash#sample-hash-fold-id'

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
  it('Checks if the opens fold referenced in url hash', function() {
    cy.visit(HASH_URL)

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
