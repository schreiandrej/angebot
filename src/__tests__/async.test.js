import React from 'react'
import { render, screen } from '@testing-library/react'

import Home from '../pages/index'

describe('Home', () => {
  test('renders App component', async () => {
    render(<Home />)

    screen.debug()
    // expect(screen.queryByText(/Signed in as/)).toBeNull()

    // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument()
  })
})
