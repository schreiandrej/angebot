export const Indicators = ({ itemCount, currentIndex }) => {
  return (
    <div className='flex flex-row w-full justify-center gap-2 py-2'>
      {itemCount.map((item, index) => (
        <div key={index}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            width='2'
            height='2'
            className={`transition-colors duration-300 ease-linear ${
              currentIndex === index
                ? 'text-base bg-base ring-1 ring-gray-500'
                : 'text-base bg-base text-opacity-20 opacity-20'
            } rounded-full`}
          >
            <circle
              cx='5'
              cy='5'
              r='10'
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='5'
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
