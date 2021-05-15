import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { options } from '@/components/priceChart/options'
import {
  useSortData,
  showDiffrentPeriods,
} from '@/components/priceChart/useSortData'
import { getPostleitzahlArray } from '@/components/priceChart/getPostleitzeitArray'
import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { data } from './chartData'
import { ListboxComponent } from '@/components/base/headlessUI/listbox'

export const LineChart = ({ className, preisliste, plzListboxOptions }) => {
  const [chartData, setChartData] = useState({
    labels: '',
    values: '',
  })
  const [optionsList, setOptionsList] = useState([])
  const [selectedOption, setSelectedOption] = useState(plzListboxOptions[0])
  const [searchedDate, setSearchedDate] = useState(new Date())

  useEffect(() => {
    const lineData = useSortData(preisliste, 30, searchedDate, 0)

    setChartData({
      values: lineData.values,
      labels: lineData.labels,
    })

    setOptionsList(plzListboxOptions)
  }, [])

  const setChartToDiffrenPeriod = (period) => {
    const lineData = useSortData(
      preisliste,
      selectedOption.value,
      searchedDate,
      period
    )

    setChartData({
      values: lineData.values,
      labels: lineData.labels,
    })
  }

  return (
    <Container className='flex flex-col items-stretch relative'>
      <Title className='mb-20'>Preisentwicklung</Title>
      <Line data={data(chartData.labels, chartData.values)} options={options} />
      <div className='flex flex-row gap-1 absolute top-12 right-12 text-sm'>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(180)}
          className='button-outlined w-38'
        >
          6 Monate
        </button>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(360)}
          className='button-outlined w-38 focus:border-gray-200'
        >
          1 Jahr
        </button>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(720)}
          className='button-outlined w-38 focus:border-gray-200'
        >
          2 Jahr
        </button>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(1080)}
          className='button-outlined w-38 focus:border-gray-200'
        >
          3 Jahr
        </button>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(1440)}
          className='button-outlined w-38 focus:border-gray-200'
        >
          4 Jahr
        </button>
        <button
          type='button'
          onClick={() => setChartToDiffrenPeriod(0)}
          className='button-outlined w-38 focus:border-gray-200'
        >
          Gesamt
        </button>

        <div className='flex flex-col justify-center relative ml-10 w-20 z-10 text-xs'>
          <label
            htmlFor='postleitzahlSelect'
            className='absolute -top-4 left-1'
          >
            PLZ
          </label>

          <ListboxComponent
            options={optionsList}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            className='py-3'
          />
        </div>
      </div>
    </Container>
  )
}
