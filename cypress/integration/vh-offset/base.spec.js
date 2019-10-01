const URL = '/iframe.html?id=vhoffset--intro'

describe('Vh-Offset', function() {
  it('Check if vh offset is correct', function() {
    cy.visit(URL)

    cy.get('[data-cy=element]').then($el => {
      const windowHeight = $el[0].ownerDocument.defaultView.innerHeight
      console.log(windowHeight)
      expect($el[0]).to.have.css('height', windowHeight + 'px')
    })
  })
})
