import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const PreisGenannt = forwardRef<HTMLInputElement, InputProps>(
  (params, ref) => {
    return (
      <div className='flex flex-row-reverse gap-2 justify-start items-center py-2'>
        <label htmlFor='preisgenannt'>Preis genannt</label>
        <input
          id='preisgenannt'
          type='checkbox'
          name='preisgenannt'
          autoComplete='off'
          ref={ref}
        />
      </div>
    )
  }
)
