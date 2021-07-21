import { forwardRef } from 'react'

export const Anrufnummer = forwardRef((props, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>Anrufnummer</label>
      <input type='tel' name='anrufnummer' autoComplete='off' ref={ref} />
    </div>
  )
})
