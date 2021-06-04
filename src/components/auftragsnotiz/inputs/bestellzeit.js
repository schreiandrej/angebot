import { forwardRef } from 'react'

export const Bestellzeit = forwardRef((props, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>Zeit</label>
      <input
        type='tel'
        name='bestellzeit'
        autoComplete='off'
        max='4'
        ref={ref}
      />
    </div>
  )
})
