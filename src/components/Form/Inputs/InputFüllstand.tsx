interface Props {
  register: any
}

export const InputFüllstand = ({ register }: Props) => {
  return (
    <div className='relative w-full flex flex-col'>
      <label htmlFor='füllstand' className=''>
        Füllstand
      </label>
      <input
        type='text'
        id='füllstand'
        autoComplete='off'
        {...register('füllstand', { min: 0, max: 85 })}
      />
    </div>
  )
}
