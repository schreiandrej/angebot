import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import { Vorkasse } from '@/components/Vorkasse/Vorkasse'

afterEach(cleanup)

test('check inputs', async () => {
  const utils = render(<Vorkasse />)

  const preis = utils.getByLabelText('Preis/l')
  const liter = utils.getByLabelText('Liter')

  await act(async () => {
    fireEvent.change(preis, { target: { value: 80 } })
    fireEvent.change(liter, { target: { value: 1000 } })
    fireEvent.click(screen.getByRole('submit'))
  })

  expect(screen.getByRole('nettoGesamtpreis')).toHaveTextContent(
    '811,00 € zzgl. MwSt.'
  )
})
