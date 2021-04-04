import { useState, useEffect } from 'react'
import { Container } from '@/components/base/container'
import { format, fromUnixTime } from 'date-fns'
import { Line } from 'react-chartjs-2'
import { options } from './options'
import { Title } from '@/components/base/title'

export const WeatherForcast = ({ weatherData }) => {
  const minTemp = weatherData.map((day) => day.temp.min)
  const maxTemp = weatherData.map((day) => day.temp.max)
  const days = weatherData.map((day) =>
    format(fromUnixTime(day.dt), 'dd.MM.yy')
  )

  const data = {
    labels: days,
    datasets: [
      {
        label: 'min Temp',
        data: minTemp,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(217, 119, 32, 0.2)',
        pointBorderColor: 'black',
        pointBackgroundColor: 'white',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'yellow',
        pointHoverBorderColor: 'brown',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
      },
      {
        data: maxTemp,
        fill: false,
        borderColor: 'rgba(217, 48, 120, 0.2)',
      },
    ],
  }

  return (
    <Container className='h-full items-center justify-center'>
      <Title className='pb-8'>Wettervorhersage</Title>
      <div className='flex flex-row gap-2 text-sm'>
        {weatherData &&
          weatherData.map((day) => {
            return (
              <div className='flex flex-col items-center' key={day.dt}>
                <div className=''>{`${format(
                  fromUnixTime(day.dt),
                  'dd.MM.yy'
                )}`}</div>
                <div className='text-yellow-600'>{day.temp.max}</div>
                <div className='text-blue-500'>{day.temp.min}</div>
              </div>
            )
          })}
      </div>
      <Line data={data} options={options} />
    </Container>
  )
}
