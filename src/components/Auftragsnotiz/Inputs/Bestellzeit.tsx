import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const Bestellzeit = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='bestellzeit'>Zeit</label>
        <input
          id='bestellzeit'
          type='tel'
          name='bestellzeit'
          autoComplete='off'
          max='4'
          ref={ref}
        />
      </div>
    )
  }
)
