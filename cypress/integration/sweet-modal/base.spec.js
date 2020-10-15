import { eventHub } from '@goldinteractive/js-base'
const URL = '/iframe.html?id=sweetmodal--intro'

describe('SweetModal', function() {
  it('Check if modal opens and closes correctly', function() {
    cy.visit(URL)
    cy.get('[data-cy=sweet-modal-content]').should('not.be.visible')
    cy.get('[data-cy=trigger]').click()
    cy.get('[data-cy=sweet-modal-content]').should('be.visible')
    cy.get('.swal2-close').click()
    cy.get('[data-cy=sweet-modal-content]').should('not.be.visible')
  })
})
