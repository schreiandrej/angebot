import Link from 'next/link'

export const ISNPreis = ({ isnpreis, setShowContent }) => {
  return (
    <div className='flex flex-col items-start justify-evenly w-full'>
      <h4 className='text-2xl mb-6'>{`ISN-Preis: ${isnpreis} Cent/l`}</h4>
      <div className='flex w-full'>
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
