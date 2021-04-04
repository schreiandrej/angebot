import { useState } from 'react'

export const Input = ({
  name,
  type,
  label,
  inputStyles,
  labelStyles,
  autoComplete,
  register,
  accept,
  max,
  min,
  autoFocus,
  placeholder,
}) => {
  const [active, activeSet] = useState(false)

  const handleActivation = (e) => {
    activeSet(!!e.target.value)
  }

  const handleActivationFocus = () => {
    activeSet(true)
  }

  const handleActivationBlur = (e) => {
    if (e.target.value === '') {
      activeSet(false)
    }
  }

  return (
    <div className='relative z-10'>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={`z-10 text-sm cursor-text ${
          active ? '' : ''
        } ${inputStyles}`}
        accept={accept}
        max={max}
        min={min}
        onFocus={handleActivationFocus}
        onBlur={handleActivationBlur}
        onChange={handleActivation}
        ref={register}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
      <label
        htmlFor={name}
        className={`absolute -z-10 left-4 flex items-center focus:outline-none transition-all duration-200 ease-in-out ${
          active ? 'text-xs -top-5' : 'text-sm absoluteY-center'
        } ${labelStyles}`}
      >
        {label}
      </label>
    </div>
  )
}
