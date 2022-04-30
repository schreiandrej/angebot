import { calculate } from '@/utils/utils'
import { initialFormState, listOptions } from '@/utils/variables'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { copyTable } from '@/utils/copyTable'
import { OutputSection } from './OutputSection'
import { InputLiter } from './InputLiter'
import { InputPreis } from './InputPreis'
import { InputZuschlag } from './InputZuschlag'
import { IOptionsType, IData, IForm } from '../../types'
import { InputTankvolumen } from './InputTankvolumen'
import { InputADRZuschlag } from './InputADRZuschlag'
import { InputFüllstand } from './InputFüllstand'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setState'

export const FormComponent = () => {
  const [selectedOption, setSelectedOption] = useState<IOptionsType>(
    listOptions[0]
  )
  const { handleSubmit, reset, register, control, errors, clearErrors } =
    useForm()
  const [formState, setFormState] = useState<IForm>(initialFormState)
  const [totalAmount, setTotalAmount] = useState(0)

  const {
    liter,
    literpreis,
    zuschlag,
    dieselzuschlag,
    füllstand,
    tankvolumen,
    adr,
  } = formState

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])

    setFormState(initialFormState)
  }

  const onSubmit = ({ preis, liter, adr, füllstand, tankvolumen }: IData) => {
    setFormState(
      setStateOnSubmit(
        formState,
        liter,
        preis,
        selectedOption,
        adr,
        tankvolumen,
        füllstand
      )
    )

    copyTable()
  }

  useEffect(() => {
    setTotalAmount(
      calculate(
        literpreis,
        liter,
        zuschlag,
        dieselzuschlag,
        füllstand,
        tankvolumen,
        adr
      )
    )
  }, [formState])

  return (
    <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
      <section className='flex flex-row w-full gap-3'>
        <InputPreis register={register} errors={errors} />
        <InputFüllstand register={register} />
        <InputLiter register={register} />
      </section>
      <section className='flex w-full gap-5'>
        <InputZuschlag
          control={control}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <InputTankvolumen control={control} />
      </section>
      <InputADRZuschlag register={register} />
      <OutputSection
        liter={liter}
        preisProLiter={literpreis}
        preis={totalAmount}
        zuschlag={zuschlag}
        dieselzuschlag={dieselzuschlag}
        adr={adr}
      ></OutputSection>
      <section className='flex flex-row gap-2 my-4 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
