import { forwardRef } from 'react'

export const PreisPro100Liter = forwardRef((params, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>Preis/100l</label>
      <input
        type='number'
        step='0.01'
        name='preis'
        autoComplete='off'
        ref={ref}
        size='3'
      />
    </div>
  )
})
