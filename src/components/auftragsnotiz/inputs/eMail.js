import { forwardRef } from 'react'

export const EMail = forwardRef((params, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label>E-Mail</label>
      <input
        type='email'
        name='email'
        autoComplete='email'
        ref={ref}
        className='bg-transparent'
      />
    </div>
  )
})
