import { forwardRef } from 'react'

export const Sondervereinbarung = forwardRef((params, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>Sondervereinbarung</label>
      <textarea
        name='sondervereinbarung'
        rows='3'
        autoComplete='off'
        ref={ref}
      />
    </div>
  )
})
