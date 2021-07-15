import { render } from '@testing-library/react'

import ColorMode from './color-mode'

describe('ColorMode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorMode />)
    expect(baseElement).toBeTruthy()
  })
})
