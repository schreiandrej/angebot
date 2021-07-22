import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { useSortData } from '@/components/PriceChart/useSortData'
import { ListboxComponent } from '@/components/Vorkasse/Listbox'

type ISNPreisProps = {
  isnpreis: any
  className?: string
  preisliste: any
  plzListboxOptions: any
}

export const ISNPreis = ({
  isnpreis,
  className,
  preisliste,
  plzListboxOptions,
}: ISNPreisProps) => {
  const [optionsList, setOptionsList] = useState([])
  const [selectedOption, setSelectedOption] = useState(plzListboxOptions[0])
  const [searchedDate, setSearchedDate] = useState(new Date())
  const [showPreis, setShowPreis] = useState(isnpreis)

  useEffect(() => {
    setOptionsList(plzListboxOptions)
  }, [])

  useEffect(() => {
    const { preis } = useSortData(
      preisliste,
      selectedOption.value,
      searchedDate,
      0
    )

    setShowPreis(preis)
  }, [searchedDate, selectedOption])

  return (
    <div className='flex flex-row w-full items-center justify-between'>
      <div
        className={`hidden md:flex flex-col items-start justify-evenly ${className}`}
      >
        <h2 className='text-base text-xl'>{`ISN-Preis: ${showPreis} Cent/l`}</h2>
      </div>
      <div className='flex flex-row items-center justify-end gap-1 text-xs'>
        <div className='relative w-1/2'>
          <label className='absolute -top-5 left-1'>Datum</label>
          <DatePicker
            selected={searchedDate}
            onChange={(date: any) => setSearchedDate(date)}
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

          <ListboxComponent
            options={optionsList}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            className='py-3'
          />
        </div>
      </div>
    </div>
  )
}
