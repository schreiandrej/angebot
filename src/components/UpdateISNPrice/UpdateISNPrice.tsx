import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import { SplittedFormDataType, UpdateDataFormType } from '@/types/types'

// TODO => a clear form functionality, Back button,  a better Layout ....

export const UpdateISN = () => {
  const { register, handleSubmit, reset, errors } = useForm()
  const [searchedDate, setSearchedDate] = useState(new Date())

  // TODO => implement an update identifier like an Popup or a snackbar
  // const [showUpdateInfo, setShowUpdateInfo] = useState(false)

  const [splittedFormData, setSplittedFormData] =
    useState<SplittedFormDataType>()

  const onSubmit = (data: UpdateDataFormType) => {
    const date = format(new Date(searchedDate), 'yyyy-MM-dd')

    setSplittedFormData({
      price: {
        30: data['30-34'],
        31: data['30-34'],
        32: data['30-34'],
        33: data['30-34'],
        34: data['30-34'],
        35: data['35-39'],
        36: data['35-39'],
        37: data['35-39'],
        38: data['35-39'],
        39: data['35-39'],
        40: data['40-45,47'],
        41: data['40-45,47'],
        42: data['40-45,47'],
        43: data['40-45,47'],
        44: data['40-45,47'],
        45: data['40-45,47'],
        47: data['40-45,47'],
        49: data['46,48,49'],
        50: data['50-52, 57-59'],
        51: data['50-52, 57-59'],
        52: data['50-52, 57-59'],
        57: data['50-52, 57-59'],
        58: data['50-52, 57-59'],
        59: data['50-52, 57-59'],
      },
      date,
    })

    reset()
  }

  useEffect(() => {
    if (splittedFormData) updateISNPrice(splittedFormData)
  }, [splittedFormData])

  const updateISNPrice = async (dataToUpdate: SplittedFormDataType) => {
    try {
      const res = await fetch(`/api/update`, {
        method: 'PUT',
        headers: {
          //prettier-ignore
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      })
    } catch (error) {}
  }

  return (
    <form className='flex flex-col items-center justify-center w-1/3 gap-10 mx-auto '>
      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor=''>Date:</label>
        <DatePicker
          selected={searchedDate}
          onChange={(date: Date) => setSearchedDate(date)}
          closeOnScroll={true}
          dateFormat='dd.MM.yyyy'
          startDate={searchedDate}
          popperPlacement='right-start'
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '5px, 10px',
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
          className='text-center w-min-full'
        />
      </div>
      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor='30-34'>30-34:</label>
        <input
          type='text'
          name='30-34'
          id='30-34'
          autoComplete='off'
          ref={register({ required: 'Bitte den Preis eingeben!' })}
        />
      </div>
      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor='35-39'>35-39:</label>
        <input
          type='text'
          name='35-39'
          id='35-39'
          autoComplete='off'
          ref={register({ required: 'Bitte den Preis eingeben!' })}
        />
      </div>
      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor='40-45,47'>40-45,47:</label>
        <input
          type='text'
          name='40-45,47'
          id='40-45,47'
          autoComplete='off'
          ref={register({ required: 'Bitte den Preis eingeben!' })}
        />
      </div>
      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor='46,48,49'>46,48,49:</label>
        <input
          type='text'
          name='46,48,49'
          id='46,48,49'
          autoComplete='off'
          ref={register({ required: 'Bitte den Preis eingeben!' })}
        />
      </div>

      <div className='flex flex-row items-center justify-between w-full'>
        <label htmlFor='50-52, 57-59'>50-52, 57-59:</label>
        <input
          type='text'
          name='50-52, 57-59'
          id='50-52, 57-59'
          autoComplete='off'
          ref={register({ required: 'Bitte den Preis eingeben!' })}
        />
      </div>

      <button
        type='submit'
        className='w-full button-outlined'
        onClick={handleSubmit(onSubmit)}
      >
        update
      </button>
    </form>
  )
}
