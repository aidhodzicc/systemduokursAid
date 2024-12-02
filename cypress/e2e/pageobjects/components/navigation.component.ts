export class Navigation {
  private url: string
  constructor(url) {
    this.url = url
  }

  visit = (options: { url?: string }) => {
    this.getNavigationLink({ url: options?.url || this.url }).click()
    cy.url().should('include', `${options?.url || this.url}`)
  }

  getNavigationLink(options: { url: string }) {
    return cy.get(`a[href="/${options.url}"]`).first()
  }
}
