import { ISNPreis } from './isnPreis'
import format from 'date-fns/format'
import de from 'date-fns/locale/de'
import { useSortData } from '@/hooks/useSortData'
import { Container } from '@/components/base/container'
import { Title } from '@/components/base/title'
import { CoffePicOfTheDay } from './coffePicture'

export const Sidebar = ({ preisliste, setShowContent }) => {
  const heute = new Date()
  const { postleitzahl, date, preis } = useSortData(preisliste, 33, heute)

  return (
    <Container className='items-start justify-start'>
      <Title className=''>
        <div className='text-3xl'>Guten Morgen!</div>
        <div className='text-2xl'>{format(heute, 'PPPP', { locale: de })}</div>
      </Title>
      <div className='flex flex-col w-full h-full justify-evenly'>
        <ISNPreis isnpreis={preis} setShowContent={setShowContent} />
        <CoffePicOfTheDay />
      </div>
    </Container>
  )
}
