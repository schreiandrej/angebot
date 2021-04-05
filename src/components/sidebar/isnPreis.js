import Link from 'next/link'
import { Title } from '@/components/base/title'

export const ISNPreis = ({ isnpreis, setShowContent }) => {
  return (
    <div className='flex flex-col items-start justify-evenly w-full'>
      <Title className='text-2xl mb-6'>{`ISN-Preis: ${isnpreis} Cent/l`}</Title>
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
