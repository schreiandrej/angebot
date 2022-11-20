type Props = {
  register: any
  errors: any
}

export function InputCheckboxADRZuschlag({ register, errors }: Props) {
  return (
    <div className='flex items-center gap-2'>
      <label htmlFor='checkboxADRZuschlag'>ADR Zuschlag</label>

      <input
        type='checkbox'
        className={`rounded-sm checked:text-gray-400 hover:checked:text-slate-600 checked:active:text-gray-400 active:ring-0 focus:ring-gray-600 active:outline-none`}
        id='checkboxADRZuschlag'
        defaultChecked
        {...register('checkboxADRZuschlag')}
      />
    </div>
  )
}
