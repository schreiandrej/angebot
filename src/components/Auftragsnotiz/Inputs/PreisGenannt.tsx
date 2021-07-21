import { forwardRef } from 'react'

export const PreisGenannt = forwardRef((params, ref) => {
  return (
    <div className='flex flex-row-reverse gap-2 justify-start items-center py-2'>
      <label>Preis genannt</label>
      <input type='checkbox' name='preisgenannt' autoComplete='off' ref={ref} />
    </div>
  )
})
