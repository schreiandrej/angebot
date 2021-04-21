import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
  getByRole,
} from '@testing-library/react'
import { Calculator } from '@/components/calculator'

afterEach(cleanup)

// test('renders Calculator component', () => {
//   const { asFragment } = render(<Calculator />)
//   expect(asFragment()).toMatchSnapshot()
// })

test('calculate comma separated values', async () => {
  const { getByTestId } = render(<Calculator />)

  await act(async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '3,254+3,25' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))
  })
  expect(getByTestId('result')).toHaveTextContent('6,504')
})

test('calculate point separated values', async () => {
  const { getByTestId } = render(<Calculator />)

  await act(async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '3.254+3,25' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))
  })
  expect(screen.getByRole('textbox')).toHaveValue('6,504')
})

test('calculate 2 results', async () => {
  const { getByTestId } = render(<Calculator />)

  await act(async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '3.254+3,25' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))
    fireEvent.change(await screen.getByRole('textbox'), {
      target: { value: '6,504 * 5.67' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))
  })
  expect(screen.getByRole('textbox')).toHaveValue('36,87768')
})

test('calculate 3 results', async () => {
  const { getByTestId } = render(<Calculator />)

  await act(async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '3.254+3,25' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))

    fireEvent.change(await screen.getByRole('textbox'), {
      target: { value: '6,504 * 5.67' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))

    fireEvent.change(await screen.getByRole('textbox'), {
      target: { value: '6,504 * 5.67' },
    })
    fireEvent.click(await screen.getByRole('submit-button'))

    fireEvent.change(await screen.getByRole('textbox'), {
      target: { value: `1 + 1` },
    })
    console.log(getByRole('textbox').target.value)

    fireEvent.click(await screen.getByRole('submit-button'))
  })
  expect(screen.getByRole('textbox')).toHaveValue('37,87768')
})
