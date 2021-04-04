import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { sub, format } from 'date-fns'
import { options } from '@/components/priceChart/options'
import { getData } from '@/components/priceChart/sortData'
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
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(217, 119, 32, 0.2)',
      },
    ],
  }

  const onSubmit = (data) => {
    const lineData = getData(preisliste, data.postleitzahlSelect, searchedDate)
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
    const lineData = getData(preisliste, 30, searchedDate)
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
    <Container className={` ${className} relative`}>
      <Title>preisentwicklung</Title>
      <Line data={data} options={options} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' flex flex-col w-full items-center gap-1 text-xs pt-10 '
      >
        <div className='relative flex w-full gap-1'>
          <div className='relative'>
            <label className='absolute -top-5 left-4'>Datum</label>
            <DatePicker
              selected={searchedDate}
              onChange={(date) => setSearchedDate(date)}
              closeOnScroll={true}
              dateFormat='dd.MM.yyyy'
              startDate={searchedDate}
              className='w-min-full'
            />
          </div>
          <Select
            className='h-full '
            name='postleitzahlSelect'
            options={optionsArray}
            label='Postleitzahl'
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
          <button
            type='submit'
            className='w-full button-outlined h-full py-2 important-my-0'
          >
            suchen
          </button>
        </div>
      </form>
      <div className='absolute flex flex-col text-md top-3 left-5 hover:text-gray-500'>
        {chartData.date}
        <Link href='/update-isn'>
          <a>ISN: {chartData.preis} Ct./l</a>
        </Link>
      </div>
    </Container>
  )
}
