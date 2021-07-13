import { render } from '@testing-library/react'

import HomeProductCategory from './home-product-category'

describe('HomeProductCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeProductCategory />)
    expect(baseElement).toBeTruthy()
  })
})
