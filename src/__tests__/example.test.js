import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import { Calculator } from '@/components/calculator'

afterEach(cleanup)

test('renders Calculator component', () => {
  const { asFragment } = render(<Calculator />)
  expect(asFragment()).toMatchSnapshot()
})

test('calculate 3+3', async () => {
  const { getByTestId } = render(<Calculator />)

  await act(async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '3,254+3,25' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))
  })
  expect(getByTestId('result')).toHaveTextContent('6,504')
})
