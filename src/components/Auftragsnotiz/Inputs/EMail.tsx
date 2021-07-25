import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const EMail = forwardRef<HTMLInputElement, InputProps>((params, ref) => {
  return (
    <div className='auftragsnotiz-inputs'>
      <label htmlFor='email'>E-Mail</label>
      <input
        id='email'
        type='email'
        name='email'
        autoComplete='email'
        ref={ref}
        className='bg-transparent'
      />
    </div>
  )
})
