const URL = '/iframe.html?id=overflowdetector--intro'

describe('Overflow Detector', function() {
  it('Check if overflow is detected', function() {
    cy.visit(URL)

    cy.get('[data-cy=overflow-container]')
      .should('have.class', 'custom-namespace--overflow')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView
        const before = win.getComputedStyle($els[0], 'after')
        const contentValue = before.getPropertyValue('content')
        expect(contentValue).to.eq('"Overflow detected"')
      })
  })
})
