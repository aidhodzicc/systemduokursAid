import { Page } from './base.po'

export class ContactUsPage extends Page {
  constructor() {
    super(`contact_us`, cy)
  }
}
