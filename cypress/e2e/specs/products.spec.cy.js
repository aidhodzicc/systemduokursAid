describe('Product tests', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('Find products on page', () => {
    cy.get('.single-products').first().should('be.visible')
    cy.get('.single-products')
      .first()
      .find('.productinfo')
      .find('h2')
      .should('be.visible')

    cy.get('.single-products .productinfo h2')
      .first()
      .should('be.visible')
      .and('contain.text', 'Rs. 500')

    cy.contains('Winter Top')
      .parents('.single-products')
      .find('.productinfo')
      .as('wantedProduct')

    cy.get('@wantedProduct').should('be.visible')

    cy.get('@wantedProduct').find('h2').should('contain.text', 'Rs. 600')

    cy.get('@wantedProduct').parents('.product-image-wrapper').find('.choose a')

    cy.get('@wantedProduct').trigger('mouseenter') //hover preko elementa
  })
})
