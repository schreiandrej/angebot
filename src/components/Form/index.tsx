import { initialFormState, listOptions } from '@/utils/variables'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { copyTable } from '@/utils/copyTable'
import { OutputSection } from './OutputSection'
import { InputLiter } from './InputLiter'
import { InputPreis } from './InputPreis'
import { InputZuschlag } from './InputZuschlag'
import { IOptionsType, IForm, IFormData } from '../../types'
import { InputTankvolumen } from './InputTankvolumen'
import { InputADRZuschlag } from './InputADRZuschlag'
import { InputFüllstand } from './InputFüllstand'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setState'

export const FormComponent = () => {
  const [mengenzuschlag, setMengenzuschlag] = useState<IOptionsType>(
    listOptions[0]
  )
  const [formState, setFormState] = useState<IForm>(initialFormState)

  const { handleSubmit, reset, register, control, errors, clearErrors } =
    useForm()

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])

    setFormState(initialFormState)
  }

  const onSubmit = (formData: IFormData) => {
    setFormState(setStateOnSubmit(formState, formData, mengenzuschlag))

    // copyTable()
  }

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
          selectedOption={mengenzuschlag}
          setSelectedOption={setMengenzuschlag}
        />
        <InputTankvolumen control={control} />
      </section>
      <InputADRZuschlag register={register} />
      <OutputSection formState={formState} />
      <section className='flex flex-row gap-2 my-4 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
