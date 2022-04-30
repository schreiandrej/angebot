interface Props {
  register: any
  errors: any
}

export const InputPreis = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='preis' className=''>
        Preis/l
      </label>
      <input
        type='text'
        name='preis'
        id='preis'
        autoComplete='off'
        ref={register({
          required: 'Bitte ein Preis eingeben',
        })}
      />
      {errors?.preis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis.message}
        </p>
      )}
    </div>
  )
}
