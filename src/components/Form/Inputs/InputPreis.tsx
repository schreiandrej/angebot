interface Props {
  register: any
  errors: any
}

export const InputPreis = ({ register, errors }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='literpreis' className=''>
        Preis/100 Liter
      </label>
      <input
        type='text'
        id='literpreis'
        autoComplete='off'
        {...register(`literpreis`, { required: true })}
      />
      {errors?.literpreis && (
        <p className='absolute right-0 text-xs text-red-600 -top-5'>
          {errors.preis?.message}
        </p>
      )}
    </div>
  )
}
