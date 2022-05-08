import { initialFormState } from '../../../utils/variables'

interface Props {
  register: any
  errors: any
}

export const InputGefahrgutzuschlag = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='gefahrgutzuschlag' className=''>
        Gefahrgutzuschlag
      </label>
      <input
        type='text'
        id='gefahrgutzuschlag'
        defaultValue={initialFormState.gefahrgutzuschlag
          .toFixed(2)
          .replace('.', ',')}
        autoComplete='off'
        {...register('gefahrgutzuschlag')}
      />
      {errors?.literpreis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
