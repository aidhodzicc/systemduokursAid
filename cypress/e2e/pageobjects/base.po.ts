import { Navigation } from './components/navigation.component'

class CypressPageObject {
  cy: any
  constructor(cy: any) {
    this.cy = cy
  }
}

export class Page extends CypressPageObject {
  cy: any
  url: any
  navigation: Navigation
  constructor(url: any, cy: any) {
    super(cy)
    this.url = url
  }

  public getNavigation() {
    if (this.navigation == undefined) {
      this.navigation = new Navigation(this.url)
    }
    return this.navigation
  }
}
