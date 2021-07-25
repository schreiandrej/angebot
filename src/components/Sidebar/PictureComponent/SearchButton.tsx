type SearchButtonProps = {
  setModalState: (m: boolean) => void
  className?: string
}

export const SearchButton = ({
  setModalState,
  className,
}: SearchButtonProps) => {
  return (
    <button
      type='button'
      className={`z-10 top-3 right-3 absolute ${className}`}
      onClick={() => setModalState(true)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 '
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  )
}
