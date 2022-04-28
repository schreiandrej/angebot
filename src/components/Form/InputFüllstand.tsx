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
        name='füllstand'
        id='füllstand'
        autoComplete='off'
        ref={register({
          min: 0,
          max: 85,
        })}
      />
    </div>
  )
}
