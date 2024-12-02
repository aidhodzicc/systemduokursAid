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

  it.only('Add product to cart', () => {
    // When
    cy.contains('Winter Top')
      .parents('.single-products')
      .find('.productinfo')
      .as('wantedProduct')
    cy.get('@wantedProduct').find('a.add-to-cart').click()

    // Then
    cy.get('.modal-content').should('be.visible')
    cy.get('.modal-header h4').should('contain', 'Added!')

    // When
    cy.get('.modal-body')
      .find('a[href="/view_cart"]')
      .should('be.visible')
      .click()

    // Then
    cy.contains('Winter Top').parents('tr').as('addedProduct')

    cy.get('img[src*="logo.png"]', { timeout: 50000 }).click()

    // When
    cy.contains('Blue Top')
      .parents('.single-products')
      .find('.productinfo')
      .find('a.add-to-cart')
      .click()
    cy.get('.modal-body')
      .find('a[href="/view_cart"]')
      .should('be.visible')
      .click()

    cy.get('@addedProduct').should('be.visible')
    cy.get('@addedProduct').find('.cart_price p').should('contain', 'Rs. 600')
  })
})
