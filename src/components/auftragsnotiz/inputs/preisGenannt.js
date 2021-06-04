import { forwardRef } from 'react'

export const PreisGenannt = forwardRef((params, ref) => {
  return (
    <div className='flex flex-row-reverse gap-2 justify-start items-center my-2'>
      <label>Preis genannt</label>
      <input
        type='checkbox'
        name='preisgenannt'
        defaultChecked
        autoComplete='off'
        ref={ref}
      />
    </div>
  )
})
