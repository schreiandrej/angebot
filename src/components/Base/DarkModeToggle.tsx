import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const DarkModeToggle = ({ className }) => {
  const { theme, setTheme } = useTheme()
  const [toggleState, setToggleState] = useState('dark')

  useEffect(() => {
    setToggleState(theme)
  }, [theme])

  return (
    <label className={`${className} absolute top-10 right-10 z-20 `}>
      <input
        type='checkbox'
        defaultChecked={true}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        className='invisible'
      ></input>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        width='25'
        height='25'
        className='text-heading absolute absolute-center cursor-pointer'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
        />
      </svg>
    </label>
  )
}
