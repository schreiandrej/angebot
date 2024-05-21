import { initialFormState } from 'app/utils/variables'

interface Props {
  register: any
  errors?: any
}

export const InputGuthaben = ({ register }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='guthaben' className=''>
        Guthaben
      </label>
      <input
        type='text'
        id='guthaben'
        tabIndex={5}
        defaultValue={initialFormState.guthaben.toFixed(2).replace('.', ',')}
        autoComplete='off'
        {...register('guthaben')}
      />
    </div>
  )
}
