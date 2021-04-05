import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { options } from '@/components/priceChart/options'
import { useSortData } from '@/hooks/useSortData'
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
        borderColor: 'rgba(40, 171, 232,0.5)',
      },
    ],
  }

  const onSubmit = (data) => {
    const lineData = useSortData(
      preisliste,
      data.postleitzahlSelect,
      searchedDate
    )

    const formattedLabels = lineData.labels.map((item) =>
      format(new Date(item), 'MMM. yy')
    )

    setChartData({
      values: lineData.values,
      labels: formattedLabels,
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

    lineData.labels.map((item) => console.log(item))

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
      <Title className='mb-6'>Preisentwicklung</Title>
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
    </Container>
  )
}
