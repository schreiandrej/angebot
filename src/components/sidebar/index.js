import { ISNPreis } from './isnPreis'
import { WeatherWidget } from './weatherWidget'
import { CoffePicOfTheDay } from './coffePicture'
import { useSortData } from '@/hooks/useSortData'
import { Container } from '@/components/base/container'
import { Title } from '@/components/base/title'
import de from 'date-fns/locale/de'
import format from 'date-fns/format'

export const Sidebar = ({ preisliste, setShowContent, weatherData }) => {
  const heute = new Date()
  const { postleitzahl, date, preis } = useSortData(preisliste, 33, heute)

  return (
    <Container className='items-start justify-start'>
      <div className='w-full flex flex-row justify-between'>
        <Title className='mb-4'>
          <div className='text-3xl'>Guten Morgen!</div>
          <div className='text-2xl'>
            {format(heute, 'PPPP', { locale: de })}
          </div>
        </Title>
        <WeatherWidget weatherData={weatherData} />
      </div>
      <div className='flex flex-col w-full h-full justify-evenly'>
        <ISNPreis
          className=''
          isnpreis={preis}
          setShowContent={setShowContent}
        />
        <CoffePicOfTheDay />
      </div>
    </Container>
  )
}
