import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const PreisPro100Liter = forwardRef<HTMLInputElement, InputProps>(
  (params, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='preis'>Preis/100l</label>
        <input
          id='preis'
          type='number'
          step='0.01'
          name='preis'
          autoComplete='off'
          ref={ref}
          size={3}
        />
      </div>
    )
  }
)
