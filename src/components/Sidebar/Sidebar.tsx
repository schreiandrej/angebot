import { useState } from 'react'
import { ISNPreis } from './IsnPreis'
import { WeatherWidget } from './WeatherWidget'
import { CoffePicOfTheDay } from './PictureComponent/CoffePicture'
import { useSortData } from '@/components/PriceChart/useSortData'
import { Container } from '@/components/Base/Container'
import { Title } from '@/components/Base/Title'
import { SearchModal } from './PictureComponent/SearchModal'
import de from 'date-fns/locale/de'
import format from 'date-fns/format'

export const Sidebar = ({
  preisliste,
  weatherData,
  setStateScreen,
  plzListboxOptions,
}) => {
  const heute = new Date()
  const { date, preis } = useSortData(preisliste, 33, heute)

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
    <Container className='items-start justify-start relative'>
      <div className='w-full flex flex-row justify-between'>
        <Title className='mb-4'>
          <div className='text-3xl'>Guten Morgen!</div>
          <div className='text-2xl'>
            {format(heute, 'PPPP', { locale: de })}
          </div>
        </Title>
        <WeatherWidget weatherData={weatherData} showWeather={showWeather} />
      </div>
      <div className='flex flex-col w-full h-full justify-evenly group'>
        <ISNPreis
          className=''
          isnpreis={preis}
          preisliste={preisliste}
          plzListboxOptions={plzListboxOptions}
        />
        <div className='flex w-full gap-2'>
          <button
            type='button'
            className='button-outlined w-full'
            onClick={showCalc}
          >
            Calculator
          </button>
          <button
            type='button'
            className='button-outlined w-full'
            onClick={showUpdateISN}
          >
            Update
          </button>
          <button
            type='button'
            className='button-outlined w-full'
            onClick={showChart}
          >
            Chart
          </button>
        </div>
        <CoffePicOfTheDay />
        <SearchModal />
      </div>
    </Container>
  )
}
