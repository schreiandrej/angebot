interface Props {
  register: any
  errors: any
}

export const InputVorkasse = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='vorkasse' className=''>
        Vorkasse
      </label>
      <input
        type='text'
        id='vorkasse'
        autoComplete='off'
        tabIndex={2}
        {...register('vorkasse')}
      />
      {errors?.vorkasse && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
