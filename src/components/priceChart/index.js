import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { options } from '@/components/priceChart/options'
import { useSortData } from '@/components/priceChart/useSortData'
import { getPostleitzahlArray } from '@/components/priceChart/getPostleitzeitArray'
import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { data } from './chartData'
import { ListboxComponent } from '@/components/base/headlessUI/listbox'

export const LineChart = ({ className, preisliste, plzListboxOptions }) => {
  const [chartData, setChartData] = useState({
    labels: '',
    values: '',
    date: '',
    preis: '',
  })
  const [optionsList, setOptionsList] = useState([])
  const [selectedOption, setSelectedOption] = useState(plzListboxOptions[0])
  const [searchedDate, setSearchedDate] = useState(new Date())

  const optionsArray = [{ option: '', value: '' }]
  getPostleitzahlArray(preisliste).map((item) =>
    optionsArray.push({ option: item, value: item })
  )
  useEffect(() => {
    const lineData = useSortData(preisliste, 30, searchedDate)

    setChartData({
      values: lineData.values,
      labels: lineData.labels,
      date: lineData.date,
      plz: lineData.postleitzahl,
      preis: lineData.preis,
      today: lineData.today,
    })
  }, [])

  return (
    <Container className='flex flex-col items-stretch relative'>
      <Title className='mb-20'>Preisentwicklung</Title>
      <Line data={data(chartData.labels, chartData.values)} options={options} />
      <div className='flex flex-row gap-1 absolute top-12 right-12'>
        <button
          type='button'
          onClick={() => console.log(1)}
          className='button-outlined w-38'
        >
          1 Jahr
        </button>
        <button
          type='button'
          onClick={() => console.log(2)}
          className='button-outlined w-38'
        >
          2 Jahr
        </button>
        <button
          type='button'
          onClick={() => console.log(3)}
          className='button-outlined w-38'
        >
          3 Jahr
        </button>
        <div className='flex flex-col relative ml-10 w-20 z-10'>
          <label
            htmlFor='postleitzahlSelect'
            className='absolute -top-5 left-1'
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
