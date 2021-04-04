export const RadioGroup = ({ legend, children }) => {
  return (
    <fieldset className=''>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

export const RadioButton = ({ id, name, value, checked, label, register }) => {
  return (
    <div className='flex flex-row items-center gap-1'>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        className={`text-transparent`}
        ref={register}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
