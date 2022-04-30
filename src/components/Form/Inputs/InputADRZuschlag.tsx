interface Props {
  register: any
}

export const InputADRZuschlag = ({ register }: Props) => {
  return (
    <div className='flex items-center justify-end gap-2'>
      <input
        type='checkbox'
        id='adrzuschlag'
        className={`text-gray-500 bg-transparent rounded-sm`}
        {...register('adrzuschlag')}
        defaultChecked
      />
      <label htmlFor='adrzuschlag' className='text-xs'>
        ADR-Zuschlag
      </label>
    </div>
  )
}
