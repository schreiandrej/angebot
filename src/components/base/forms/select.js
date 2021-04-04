import { useState } from 'react'

export const Select = ({
  name,
  label,
  options,
  inputStyles,
  labelStyles,
  autoComplete,
  accept,
  max,
  min,
  register,
}) => {
  const [active, activeSet] = useState(false)

  const handleActivation = (e) => {
    activeSet(!!e.target.value)
  }

  const handleActivationFocus = () => {
    activeSet(true)
  }

  const handleActivationBlur = (e) => {
    if (e.target.value === '0') {
      activeSet(false)
    }
  }

  return (
    <div className='relative z-10 w-full'>
      <select
        name={name}
        autoComplete={autoComplete}
        className={`${inputStyles} w-full z-10 text-sm bg-transparent cursor-text transition-all duration-200 ease-in-out ${
          active ? '' : ''
        }`}
        accept={accept}
        max={max}
        min={min}
        onFocus={handleActivationFocus}
        onBlur={handleActivationBlur}
        onChange={handleActivation}
        ref={register}
      >
        {options.map((option) => {
          return (
            <option
              className='bg-base border-0'
              value={option.value}
              key={option.option.toLowerCase()}
            >
              {option.option}
            </option>
          )
        })}
      </select>
      <label
        htmlFor={name}
        className={`${labelStyles} absolute -z-10 left-4 flex items-center focus:outline-none transition-all duration-200 ease-in-out ${
          active ? 'text-xs -top-5' : 'text-sm absoluteY-center'
        }`}
      >
        {label}
      </label>
    </div>
  )
}
