import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { mutate } from 'swr'
import { Input } from '@/components/base/forms/input'
import DatePicker from 'react-datepicker'

// TODO => a clear form functionality, Back button,  a better Layout ....

export default function UpdateISN() {
  const { register, handleSubmit, errors } = useForm()
  const [searchedDate, setSearchedDate] = useState(new Date())

  // TODO => implement an update identifier like an Popup or a snackbar
  // const [showUpdateInfo, setShowUpdateInfo] = useState(false)

  const [splittedFormData, setSplittedFormData] = useState()

  const onSubmit = (data) => {
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

    updateISNPrice(splittedFormData)
  }

  const updateISNPrice = async (dataToUpdate) => {
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
    <main className='flex h-screen w-full justify-center items-center bg-primary text-primaryText'>
      <form className='flex flex-col gap-10 items-center justify-center border border-primary rounded-md p-10'>
        <div>
          <DatePicker
            selected={searchedDate}
            onChange={(date) => setSearchedDate(date)}
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
            className='w-min-full text-center'
          />
        </div>
        <hr className='border border-primary w-full' />
        <Input
          type='text'
          name='30-34'
          label='30-34'
          autoComplete='off'
          inputStyles='text-center'
          labelStyles='left-[40%]'
          register={register({ required: 'Bitte den Preis eingeben!' })}
        />
        <Input
          type='text'
          name='35-39'
          label='35-39'
          autoComplete='off'
          inputStyles='text-center'
          labelStyles='left-[40%]'
          register={register({ required: 'Bitte den Preis eingeben!' })}
        />
        <Input
          type='text'
          name='40-45,47'
          label='40-45,47'
          autoComplete='off'
          inputStyles='text-center'
          labelStyles='left-[35%]'
          register={register({ required: 'Bitte den Preis eingeben!' })}
        />
        <Input
          type='text'
          name='46,48,49'
          label='46,48,49'
          autoComplete='off'
          inputStyles='text-center'
          labelStyles='left-[35%]'
          register={register({ required: 'Bitte den Preis eingeben!' })}
        />
        <Input
          type='text'
          name='50-52, 57-59'
          label='50-52, 57-59'
          autoComplete='off'
          inputStyles='text-center'
          labelStyles='left-[30%]'
          register={register({ required: 'Bitte den Preis eingeben!' })}
        />
        <hr className='border border-primary w-full' />
        <button
          type='submit'
          className='button-outlined w-full'
          onClick={handleSubmit(onSubmit)}
        >
          update
        </button>
      </form>
    </main>
  )
}
