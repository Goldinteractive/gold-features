const URL = '/iframe.html?id=domstatehandler--intro'

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
})
