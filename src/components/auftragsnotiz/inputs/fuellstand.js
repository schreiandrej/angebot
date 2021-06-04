import { forwardRef } from 'react'

export const Fuellstand = forwardRef((params, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>Füllstand</label>
      <input type='number' name='fuellstand' autoComplete='off' ref={ref} />
    </div>
  )
})
