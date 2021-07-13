import { render } from '@testing-library/react'

import NextLinkButton from './next-link-button'

describe('NextLinkButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLinkButton />)
    expect(baseElement).toBeTruthy()
  })
})
