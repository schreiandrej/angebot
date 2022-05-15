import { initialFormState } from '../../../utils/variables'

interface Props {
  register: any
  errors: any
}

export const InputMengenzuschlag = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='mengenzuschlag' className=''>
        Mengenzuschlag
      </label>
      <input
        type='text'
        id='mengenzuschlag'
        tabIndex={3}
        defaultValue={initialFormState.mengenzuschlag
          .toFixed(2)
          .replace('.', ',')}
        autoComplete='off'
        {...register('mengenzuschlag')}
      />
      {errors?.literpreis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
