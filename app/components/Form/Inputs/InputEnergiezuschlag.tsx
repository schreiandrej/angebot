import { initialFormState } from '../../../utils/variables'

interface Props {
  register: any
  errors: any
}

export const InputEnergiezuschlag = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='energiezuschlag' className=''>
        Energiezuschlag
      </label>
      <input
        type='text'
        id='energiezuschlag'
        defaultValue={initialFormState.energiezuschlag
          .toFixed(2)
          .replace('.', ',')}
        autoComplete='off'
        {...register('energiezuschlag')}
      />
      {errors?.literpreis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
