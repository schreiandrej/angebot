import Link from 'next/link'

export const ISNPreis = ({ isnpreis, setShowContent }) => {
  return (
    <div className='flex flex-col items-start justify-evenly w-full'>
      <h2 className='text-base text-xl mb-6'>{`ISN-Preis: ${isnpreis} Cent/l`}</h2>
      <div className='flex w-full gap-2'>
        <button type='button' className='button-outlined w-full'>
          <Link href='/update-isn'>
            <a>Update</a>
          </Link>
        </button>
        <button
          type='button'
          className='button-outlined w-full'
          onClick={setShowContent}
        >
          Chart
        </button>
      </div>
    </div>
  )
}
