import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useSortData } from '@/components/priceChart/useSortData'
import { getPostleitzeitArray } from '@/components/priceChart/getPostleitzeitArray'
import { Select } from '@/components/base/forms/select'

export const ISNPreis = ({ isnpreis, className, preisliste }) => {
  const { register, handleSubmit, errors } = useForm()
  const [searchedDate, setSearchedDate] = useState(new Date())
  const [showPreis, setShowPreis] = useState(isnpreis)

  const onSubmit = (data) => {
    const preis = useSortData(preisliste, data.postleitzahlSelect, searchedDate)

    setShowPreis(preis)
  }

  const optionsArray = [{ option: '', value: '' }]
  getPostleitzeitArray(preisliste).map((item) =>
    optionsArray.push({ option: item, value: item })
  )

  return (
    <div
      className={`hidden md:flex flex-col items-start justify-evenly w-full ${className}`}
    >
      <h2 className='text-base text-xl mb-6'>{`ISN-Preis: ${showPreis} Cent/l`}</h2>
    </div>
  )
}
