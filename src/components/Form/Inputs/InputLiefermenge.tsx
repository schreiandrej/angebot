interface Props {
  register: any
}

export const InputLiefermenge = ({ register }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='liefermenge' className=''>
        Liefermenge
      </label>
      <input
        type='text'
        id='liefermenge'
        tabIndex={5}
        autoComplete='off'
        {...register('liefermenge', { minLength: 0, maxLength: 10000 })}
      />
    </div>
  )
}
