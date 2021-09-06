import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const Fuellstand = forwardRef<HTMLInputElement, InputProps>(
  (params, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='fuellstand'>Füllstand</label>
        <input
          id='fuellstand'
          type='text'
          name='fuellstand'
          autoComplete='off'
          ref={ref}
        />
      </div>
    )
  }
)
