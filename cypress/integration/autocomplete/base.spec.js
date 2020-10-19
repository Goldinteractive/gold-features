import { features, eventHub } from '@goldinteractive/js-base'

const URL = '/iframe.html?id=autocomplete--intro'

describe('Autocomplete', function() {
  it('Checks if the Autocomplete works accordingly', function() {
    cy.visit(URL)
    cy.get('[data-cy=input').type('schw')
    cy.get('[data-cy=input').type('{enter}')
    cy.get('[data-cy=input').should('have.value', 'Schweiz')
  })
})
