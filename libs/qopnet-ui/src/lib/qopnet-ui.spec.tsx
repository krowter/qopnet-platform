import { render } from '@testing-library/react'

import QopnetUi from './qopnet-ui'

describe('QopnetUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QopnetUi />)
    expect(baseElement).toBeTruthy()
  })
})
