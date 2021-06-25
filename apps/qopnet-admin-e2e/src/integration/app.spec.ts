import { getHeaderTitle } from '../support/app.po'

describe('qopnet-admin', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('demo@qopnet.id', 'demo-password-123')

    // Function helper example, see `../support/app.po.ts` file
    getHeaderTitle().contains('Admin Dashboard')
  })
})
