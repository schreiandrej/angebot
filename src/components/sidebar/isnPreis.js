import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useSortData } from '@/components/priceChart/useSortData'
import { getPostleitzahlArray } from '@/components/priceChart/getPostleitzeitArray'
import { ListboxComponent } from '@/components/base/headlessUI/listbox'

export const ISNPreis = ({ isnpreis, className, preisliste }) => {
  const { register, handleSubmit, errors, control } = useForm()
  const [optionsList, setOptionsList] = useState([])
  const [searchedDate, setSearchedDate] = useState(new Date())
  const [showPreis, setShowPreis] = useState(isnpreis)
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    name: '',
    value: 45,
    unavailable: false,
  })
  const optionsArray = []

  const onSubmit = (data) => {
    console.log(data)

    const preis = useSortData(preisliste, data.postleitzahlSelect, searchedDate)
  }

  useEffect(() => {
    getPostleitzahlArray(preisliste).map((item, index) =>
      optionsArray.push({
        id: index,
        name: item,
        value: item,
        unavailable: false,
      })
    )
    setOptionsList(optionsArray)
    setSelectedOption(optionsArray[0])
  }, [])

  useEffect(() => {}, [searchedDate])

  return (
    <div className='flex flex-row w-full items-center justify-between'>
      <div
        className={`hidden md:flex flex-col items-start justify-evenly ${className}`}
      >
        <h2 className='text-base text-xl'>{`ISN-Preis: ${showPreis} Cent/l`}</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-row items-center justify-end gap-1 text-xs'
      >
        <div className='relative w-1/3'>
          <label className='absolute -top-5 left-1'>Datum</label>
          <DatePicker
            selected={searchedDate}
            onChange={(date) => setSearchedDate(date)}
            closeOnScroll={true}
            dateFormat='dd.MM.yyyy'
            startDate={searchedDate}
            className='w-full overflow-visible'
          />
        </div>
        <div className='flex flex-col relative w-20 z-10'>
          <label
            htmlFor='postleitzahlSelect'
            className='absolute -top-5 left-1'
          >
            PLZ
          </label>
          <Controller
            control={control}
            name='postleitzahlSelect'
            defaultValue={selectedOption}
            render={() => (
              <ListboxComponent
                options={optionsList}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                className='py-3'
              />
            )}
          />
          {errors?.postleitzahlSelect && (
            <p className='text-xs text-red-600 absolute -top-5 right-0 '>
              {errors.postleitzahlSelect.message}
            </p>
          )}
        </div>
        <button type='submit' className='button-outlined'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            width='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
