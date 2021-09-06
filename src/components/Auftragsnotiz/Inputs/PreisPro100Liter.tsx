import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const PreisPro100Liter = forwardRef<HTMLInputElement, InputProps>(
  (params, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='preis'>Preis/l</label>
        <input
          id='preis'
          type='number'
          step='0.01'
          defaultValue='0.00'
          name='preis'
          autoComplete='off'
          ref={ref}
          size={3}
        />
      </div>
    )
  }
)
