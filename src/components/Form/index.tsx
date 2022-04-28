import { transformPreis } from '@/utils/utils'
import { initialFormState, listOptions } from '@/utils/variables'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { copyTable } from 'src/lib/copyTable'
import { ButtonDelete } from '../Buttons/ButtonDelete'
import { ButtonSubmit } from '../Buttons/ButtonSubmit'
import { OutputSection } from '../OutputSection'
import { InputLiter } from './InputLiter'
import { InputPreis } from './InputPreis'
import { InputZuschlag } from './InputZuschlag'
import { IOptionsType, IData, IForm } from '../../types'
import { InputTankvolumen } from './InputTankvolumen'
import { InputADRZuschlag } from './InputADRZuschlag'
import { InputFüllstand } from './InputFüllstand'

export const FormComponent = () => {
  const [selectedOption, setSelectedOption] = useState<IOptionsType>(
    listOptions[0]
  )

  const { handleSubmit, reset, register, control, errors, clearErrors } =
    useForm()
  const [formState, setFormState] = useState<IForm>(initialFormState)
  const [totalAmount, setTotalAmount] = useState(0)

  const { liter, literpreis, zuschlag, adr } = formState

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])

    setFormState({
      ...formState,
      liter: 0,
      literpreis: 0,
      zuschlag: 0,
      adr: 0,
    })
  }

  const onSubmit = ({ preis, liter, adr }: IData) => {
    setFormState({
      ...formState,
      liter: parseFloat(liter),
      literpreis: parseFloat(JSON.stringify(transformPreis(preis))),
      zuschlag: selectedOption.value,
      adr: Boolean(adr) === true ? 11 : 0,
    })

    copyTable()
  }

  useEffect(() => {
    setTotalAmount((literpreis * liter + zuschlag + adr) * 1.19)
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
        adr={adr}
      ></OutputSection>
      <section className='flex flex-row gap-2 my-4 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
