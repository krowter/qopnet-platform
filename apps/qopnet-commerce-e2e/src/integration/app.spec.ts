import { getGreeting } from '../support/app.po'

describe('Qopnet Commerce Home', () => {
  beforeEach(() => cy.visit('/'))

  it('Show header message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('name@something.com', 'the_secret_word')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Qopnet Header')
  })
})
