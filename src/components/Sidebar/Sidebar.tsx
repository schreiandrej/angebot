import { useState } from 'react'
import { ISNPreis } from './IsnPreis'
import { WeatherWidget } from './WeatherWidget'
import { DailyPicture } from './PictureComponent/DailyPicture'
import { useSortData } from '@/components/PriceChart/useSortData'
import { Title } from '@/components/MicroComponents/Title'
import { SearchModal } from './PictureComponent/SearchModal'
import de from 'date-fns/locale/de'
import format from 'date-fns/format'
import { Country } from './PictureComponent/types'

type SidebarProps = {
  preisliste: any
  weatherData: any
  setStateScreen: any
  plzListboxOptions: any
  dataCountries: any
}

export const Sidebar = ({
  preisliste,
  weatherData,
  setStateScreen,
  plzListboxOptions,
  dataCountries,
}: SidebarProps) => {
  const heute = new Date()
  const { date, preis } = useSortData(preisliste, 33, heute)
  const [capitalInfomation, setCapitalInformation] =
    useState<Country | null>(null)

  const showChart = () => {
    setStateScreen({
      calc: false,
      chart: true,
      weather: false,
      updateISN: false,
    })
  }
  const showWeather = () => {
    setStateScreen({
      calc: false,
      chart: false,
      weather: true,
      updateISN: false,
    })
  }
  const showCalc = () => {
    setStateScreen({
      calc: true,
      chart: false,
      weather: false,
      updateISN: false,
    })
  }

  const showUpdateISN = () => {
    setStateScreen({
      calc: false,
      chart: false,
      weather: false,
      updateISN: true,
    })
  }

  return (
    <div className='relative items-start justify-start'>
      <div className='flex flex-row justify-between w-full'>
        <Title className='mb-4'>
          <div className='text-3xl'>Guten Morgen!</div>
          <div className='text-2xl'>
            {format(heute, 'PPPP', { locale: de })}
          </div>
        </Title>
        <WeatherWidget weatherData={weatherData} showWeather={showWeather} />
      </div>
      <div className='flex flex-col w-full h-full justify-evenly group'>
        {/* <ISNPreis
          className=''
          isnpreis={preis}
          preisliste={preisliste}
          plzListboxOptions={plzListboxOptions}
        /> */}
        {/* <div className='flex w-full gap-2'>
          <button
            type='button'
            className='w-full button-outlined'
            onClick={showCalc}
          >
            Calculator
          </button>
          <button
            type='button'
            className='w-full button-outlined'
            onClick={showUpdateISN}
          >
            Update
          </button>
          <button
            type='button'
            className='w-full button-outlined'
            onClick={showChart}
          >
            Chart
          </button>
        </div> */}
        <DailyPicture
          dataCountries={dataCountries}
          capitalInfomation={capitalInfomation}
          setCapitalInformation={setCapitalInformation}
        />
        <SearchModal setCapitalInformation={setCapitalInformation} />
      </div>
    </div>
  )
}
