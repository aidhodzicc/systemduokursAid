import { Page } from './base.po'

export class ProductsPage extends Page {
  constructor() {
    super(`products`, cy)
  }

  getAllProductsList = () => {
    return cy.request({
      url: '/api/productsList',
      method: 'GET',
    })
  }

  getSearchProducts = (options: { productName: string }) => {
    return cy.request({
      url: '/api/searchProduct',
      method: 'POST',
      form: true,
      body: {
        search_product: `${options.productName}`,
      },
    })
  }

  //
  //
  //
  //

  searchProduct = (value: { productName: string }) => {
    return cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      body: {
        search_product: `${value.productName}`,
      },
    })
  }
}
