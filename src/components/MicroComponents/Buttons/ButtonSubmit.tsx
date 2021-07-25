type ButtonSubmitProps = {
  className?: string
  id: string
}

export const ButtonSubmit = ({ className, id }: ButtonSubmitProps) => {
  return (
    <button
      className={`button-outlined group w-full ${className} `}
      id='submitButton'
      title='Submit Button'
      type='submit'
      role='button'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        id={id}
        width='20'
        height='20'
        className='text-center text-green-900 group-hover:text-green-300 w-full'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        />
      </svg>
    </button>
  )
}
