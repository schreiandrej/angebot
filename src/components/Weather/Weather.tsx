import { useState, useEffect } from 'react'
import { format, fromUnixTime } from 'date-fns'
import de from 'date-fns/locale/de'
import { Line } from 'react-chartjs-2'
import { options } from './options'
import { Title } from '@/components/MicroComponents/Title'

export const WeatherForcast = ({ weatherData }: any) => {
  const minTemp = weatherData.map((day: any) => day.temp.min)
  const maxTemp = weatherData.map((day: any) => day.temp.max)
  const days = weatherData.map((day: any) =>
    format(fromUnixTime(day.dt), 'dd.MM.yy')
  )

  const data = {
    labels: days,
    datasets: [
      {
        label: 'min Temperatur',
        data: minTemp,
        fill: false,
        borderColor: 'hsl(215, 100%, 40%)',
        pointBorderColor: 'hsl(215, 100%, 50%)',
        pointBackgroundColor: 'hsl(215, 100%, 50%)',
        pointBorderWidth: 1,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'hsl(215, 100%, 30%)',
        pointHoverBorderColor: 'hsl(215, 100%, 30%)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
      },
      {
        label: 'max Temperatur',
        data: maxTemp,
        fill: false,
        borderColor: 'hsl(350, 30%, 40%)',
        pointBorderColor: 'hsl(350, 30%, 50%)',
        pointBackgroundColor: 'hsl(350, 30%, 50%)',
        pointBorderWidth: 1,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'hsl(350, 30%, 20%)',
        pointHoverBorderColor: 'hsl(350, 30%, 20%)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
      },
    ],
  }

  return (
    <div className='items-center justify-center h-full'>
      <Title className='pb-8'>Wettervorhersage</Title>
      <div className='flex flex-row w-full gap-2 text-sm'>
        {weatherData &&
          weatherData.map((day: any) => {
            return (
              <div
                className='flex flex-col items-center w-full gap-1'
                key={day.dt}
              >
                <div className=''>{`${format(fromUnixTime(day.dt), 'EEEE', {
                  locale: de,
                })}`}</div>
                <div className='text-yellow-600'>{day.temp.max}</div>
                <div className='text-blue-500'>{day.temp.min}</div>
              </div>
            )
          })}
      </div>
      <Line data={data} options={options} />
    </div>
  )
}
