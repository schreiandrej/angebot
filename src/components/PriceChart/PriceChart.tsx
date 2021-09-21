import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { options } from '@/components/PriceChart/options'
import {
  useSortData,
  showDiffrentPeriods,
} from '@/components/PriceChart/useSortData'
import { getPostleitzahlArray } from '@/components/PriceChart/getPostleitzeitArray'
import { Title } from '@/components/MicroComponents/Title'
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
    <div className='flex flex-col w-full h-full'>
      <Title className='text-left'>Preisentwicklung</Title>
      {chartData ? (
        <div className='relative p-10'>
          <Line
            data={data(chartData.labels, chartData.values)}
            options={options}
          />
        </div>
      ) : (
        <div>Error no data found!</div>
      )}
      <div className='absolute flex flex-row gap-1 text-sm top-12 right-12'>
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

        {/* <div className='relative z-10 flex flex-col justify-center w-20 ml-10 text-xs'>
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
    </div>
  )
}
