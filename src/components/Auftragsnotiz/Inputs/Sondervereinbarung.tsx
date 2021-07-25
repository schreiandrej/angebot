import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLTextAreaElement>
}

export const Sondervereinbarung = forwardRef<HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='sondervereinbarung'>Sondervereinbarung</label>
        <textarea
          id='sondervereinbarung'
          name='sondervereinbarung'
          rows={3}
          autoComplete='off'
          ref={ref}
        />
      </div>
    )
  }
)
