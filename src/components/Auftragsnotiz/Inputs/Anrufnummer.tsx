import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const Anrufnummer = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='anrufnummer'>Anrufnummer</label>
        <input
          id='anrufnummer'
          type='tel'
          name='anrufnummer'
          autoComplete='off'
          ref={ref}
        />
      </div>
    )
  }
)
