const URL = '/iframe.html?id=domstatehandler--intro'
const RESTORE_URL =
  '/iframe.html?id=domstatehandler--restore-from-url&option-name=option1&option-other=option2&option3=option3-1%2Coption3-2&option4=orange'

describe('DomStateHandler', function() {
  it('Checks if parameters get set accordingly', function() {
    cy.visit(URL)

    cy.get('[data-cy=select1]').select('option2')
    cy.location('href').should('include', 'option-name=option2')

    cy.get('[data-cy=checkbox2]').click()
    cy.location('href').should('include', 'option3=option3-1%2Coption3-2')

    cy.get('[data-cy=radio3]').click()
    cy.location('href').should('include', 'option4=yellow')
  })
  it('should restore state from url', function() {
    cy.visit(RESTORE_URL)
    cy.get('[data-cy=select1]').should('have.value', 'option1')
    cy.get('[data-cy=select2]').should('have.value', 'option2')
    cy.get('[data-cy=checkbox1]').should('be.checked')
    cy.get('[data-cy=checkbox2]').should('be.checked')
    cy.get('[data-cy=radio1]').should('be.checked')
    cy.get('[data-cy=radio2]').should('not.be.checked')
    cy.get('[data-cy=radio3]').should('not.be.checked')
  })
})
