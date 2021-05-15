import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { options } from '@/components/priceChart/options'
import { useSortData } from '@/components/priceChart/useSortData'
import { getPostleitzahlArray } from '@/components/priceChart/getPostleitzeitArray'
import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { Select } from '@/components/base/forms/select'

export const LineChart = ({ className, preisliste }) => {
  const { register, handleSubmit, errors } = useForm()
  const [chartData, setChartData] = useState({
    labels: '',
    values: '',
    date: '',
    preis: '',
  })
  const [searchedDate, setSearchedDate] = useState(new Date())

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        fill: false,
        borderColor: 'hsl(370, 20%, 40%)',
      },
    ],
  }

  const onSubmit = (data) => {
    const lineData = useSortData(
      preisliste,
      data.postleitzahlSelect,
      searchedDate
    )

    setChartData({
      values: lineData.values,
      labels: lineData.labels,
      date: lineData.date,
      plz: lineData.postleitzahl,
      preis: lineData.preis,
      today: lineData.today,
    })
  }

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
      <Line data={data} options={options} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-row absolute top-12 right-12 items-center gap-1 text-xs pt-10 '
      >
        <div className='relative'>
          <label className='absolute -top-5 left-1'>Datum</label>
          <DatePicker
            selected={searchedDate}
            onChange={(date) => setSearchedDate(date)}
            closeOnScroll={true}
            dateFormat='dd.MM.yyyy'
            startDate={searchedDate}
            className='w-min-full'
          />
        </div>
        <div className='flex flex-col relative w-20'>
          <label
            htmlFor='postleitzahlSelect'
            className='absolute -top-5 left-1'
          >
            PLZ
          </label>
          <Select
            className=''
            name='postleitzahlSelect'
            options={optionsArray}
            register={register({
              required: 'Bitte eine Postleitzahl eingeben!',
            })}
            inputStyles='h-full px-2'
          />
          {errors?.postleitzahlSelect && (
            <p className='text-xs text-red-600 absolute -top-5 right-0 '>
              {errors.postleitzahlSelect.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='button-outlined p-3 ml-5 ring-1 ring-gray-200 bg-opacity-70 important-my-0'
        >
          suchen
        </button>
      </form>
    </Container>
  )
}
