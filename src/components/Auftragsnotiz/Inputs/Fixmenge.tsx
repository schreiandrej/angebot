import { forwardRef } from 'react'

interface InputProps {
  ref: React.ForwardedRef<HTMLInputElement>
}

export const Fixmenge = forwardRef<HTMLInputElement, InputProps>(
  (params, ref) => {
    return (
      <div className='auftragsnotiz-inputs'>
        <label htmlFor='fixmenge'>Fixmenge</label>
        <input
          id='fixmenge'
          type='text'
          name='fixmenge'
          autoComplete='off'
          ref={ref}
        />
      </div>
    )
  }
)
