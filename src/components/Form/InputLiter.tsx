interface Props {
  register: any
}

export const InputLiter = ({ register }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='liter' className=''>
        Liter
      </label>
      <input
        type='text'
        name='liter'
        // label='Liter'
        id='liter'
        // inputStyles='w-full h-12'
        // labelStyles='px-4'
        autoComplete='off'
        ref={register({
          min: 0,
          max: 24000,
        })}
      />
    </div>
  )
}
