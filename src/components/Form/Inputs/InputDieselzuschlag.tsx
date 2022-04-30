interface Props {
  register: any
}

export const InputDieselzuschlag = ({ register }: Props) => {
  return (
    <div className='flex items-center justify-end gap-2'>
      <input
        type='checkbox'
        id='dieselzuschlag'
        className={`text-gray-500 bg-transparent rounded-sm`}
        {...register('dieselzuschlag')}
        defaultChecked
      />
      <label htmlFor='dieselzuschlag' className='text-xs'>
        Dieselzuschlag
      </label>
    </div>
  )
}
