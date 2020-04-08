const URL = '/iframe.html?id=tabs--intro'

describe('Tabs', function() {
  it('Check if tab content is switched on button click', function() {
    cy.visit(URL)

    cy.get('[data-cy=btn-tab-2]').click()

    cy.get('[data-tab=1]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')

    cy.get('[data-tab=2]')
      .should('have.class', '-active')
      .should('not.have.class', '-inactive')

    cy.get('[data-tab=3]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')

    cy.get('[data-tab-id=1]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')
    cy.get('[data-tab-id=2]')
      .should('have.class', '-active')
      .should('not.have.class', '-inactive')
    cy.get('[data-tab-id=3]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')

    cy.get('[data-feature=tab-selector-select]').should('have.value', '2')
  })

  it('Check if tab content is switched on select change event', function() {
    cy.visit(URL)

    cy.get('[data-feature=tab-selector-select]').select('2')

    cy.get('[data-tab=1]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')

    cy.get('[data-tab=2]')
      .should('have.class', '-active')
      .should('not.have.class', '-inactive')

    cy.get('[data-tab=3]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')

    cy.get('[data-tab-id=1]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')
    cy.get('[data-tab-id=2]')
      .should('have.class', '-active')
      .should('not.have.class', '-inactive')
    cy.get('[data-tab-id=3]')
      .should('not.have.class', '-active')
      .should('have.class', '-inactive')
  })
})
