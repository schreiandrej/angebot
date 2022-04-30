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
        name='liefermenge'
        id='liefermenge'
        autoComplete='off'
        ref={register({
          min: 0,
          max: 24000,
        })}
      />
    </div>
  )
}
