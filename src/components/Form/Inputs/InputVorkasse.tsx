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
        name='vorkasse'
        id='vorkasse'
        autoComplete='off'
        ref={register({})}
      />
      {errors?.literpreis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
