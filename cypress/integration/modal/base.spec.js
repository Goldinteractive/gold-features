import { eventHub } from '@goldinteractive/js-base'
const URL = '/iframe.html?id=modal--intro'

describe('Masonry', function() {
  it('Checks if items get appended', function() {
    cy.visit(URL)

    cy.get('[data-cy=modal-content]').should('be.visible')
    cy.get('[data-cy=modal-close]')
      .click()
      .should('not.be.visible')
  })
})
