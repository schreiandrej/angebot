type ArrowProps = {
  onClick: () => void
}

export const ArrowRight = ({ onClick }: ArrowProps) => {
  return (
    <div
      className='absolute z-10 absoluteY-center right-0 text-base hover:text-hover opacity-10 hover:opacity-100 cursor-pointer'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        width='20'
        height='20'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 5l7 7-7 7M5 5l7 7-7 7'
        />
      </svg>
    </div>
  )
}

export const ArrowLeft = ({ onClick }: ArrowProps) => {
  return (
    <div
      className='absolute z-10 left-0 absoluteY-center text-base hover:text-hover opacity-10 hover:opacity-100 cursor-pointer'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        width='20'
        height='20'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
        />
      </svg>
    </div>
  )
}
