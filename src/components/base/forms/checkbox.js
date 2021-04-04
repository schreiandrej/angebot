export const CheckBox = ({ name, value, id, label, register, checked }) => {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        className={`text-transparent rounded-md`}
        ref={register}
        checked
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
