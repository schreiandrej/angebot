import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { options } from '@/components/PriceChart/options'
import {
  useSortData,
  showDiffrentPeriods,
} from '@/components/PriceChart/useSortData'
import { getPostleitzahlArray } from '@/components/PriceChart/getPostleitzeitArray'
import { Title } from '@/components/MicroComponents/Title'
import { Container } from '@/components/MicroComponents/Container'
import { data } from './chartData'
import { ListboxComponent } from '@/components/Vorkasse/Listbox'
import { OptionsType } from '@/types/types'

type LineChartProps = {
  className?: string
  preisliste: any
  plzListboxOptions: OptionsType[]
}

export const LineChart = ({
  className,
  preisliste,
  plzListboxOptions,
}: LineChartProps) => {
  const [chartData, setChartData] = useState<{ values: any[]; labels: any[] }>()
  const [optionsList, setOptionsList] = useState<OptionsType[]>()
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

  const setChartToDiffrenPeriod = (period: number) => {
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
      {chartData ? (
        <Line
          data={data(chartData.labels, chartData.values)}
          options={options}
        />
      ) : (
        <div>Error no data found!</div>
      )}
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

        {/* <div className='flex flex-col justify-center relative ml-10 w-20 z-10 text-xs'>
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
        </div> */}
      </div>
    </Container>
  )
}
