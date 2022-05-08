import {
  initialFormState,
  mengezuschlagOptions,
  tankvolumenOptions,
} from '@/utils/variables'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  InputGefahrgutzuschlag,
  InputDieselzuschlag,
  InputFüllstand,
  InputLiefermenge,
  InputPreis,
  InputTankvolumen,
  InputVorkasse,
  InputMengenzuschlag,
  InputGuthaben,
} from './Inputs'
import { OutputSection } from '../Output/OutputSection'
import { IOptionsType, IForm, IFormData, IOutput } from '../../types'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setState'
import { RadioTankvolumen } from './Inputs/RadioTankvolumen'

export const FormComponent = () => {
  const [tankvolumen, setTankvolumen] = useState<number>(
    tankvolumenOptions[1].value
  )
  const [emptyFieldsError, setEmptyFieldsError] = useState<boolean>(false)

  const [formState, setFormState] = useState<IForm>(initialFormState)

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
    clearErrors,
  } = useForm()

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])

    setFormState(initialFormState)
  }

  const onSubmit = (data: any) => {
    console.log(data)

    if (data) {
      if (
        data.liefermenge === '' &&
        data.vorkasse === '' &&
        data.füllstand === ''
      ) {
        setEmptyFieldsError(true)
      } else {
        setEmptyFieldsError(false)

        setFormState(setStateOnSubmit(formState, data, tankvolumen))
      }
    }
    console.log(formState)
  }

  return (
    <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
      {emptyFieldsError && (
        <div className='absolute top-5 w-full mx-auto text-red-500 font-semibold'>
          Bitte eines der Werte: Füllstand, Liefermenge oder Vorkasse eingeben.
        </div>
      )}
      <section className='flex flex-col gap-5'>
        <div className='flex flex-row w-full gap-6'>
          <div className='flex flex-col w-full gap-2'>
            <InputPreis register={register} errors={errors} />
            <InputFüllstand register={register} />
            <RadioTankvolumen
              control={control}
              tankvolumen={tankvolumen}
              setTankvolumen={setTankvolumen}
            />
          </div>
          <div className='flex flex-row w-full gap-2'>
            <div className='flex flex-col w-full justify-between gap-2'>
              <InputVorkasse register={register} errors={errors} />
              <InputLiefermenge register={register} />
              <InputGuthaben register={register} />
            </div>
            <div className='flex flex-col gap-3'>
              <InputMengenzuschlag register={register} errors={errors} />
              <InputGefahrgutzuschlag register={register} errors={errors} />
              <InputDieselzuschlag register={register} errors={errors} />
            </div>
          </div>
        </div>
      </section>
      <OutputSection formState={formState as IOutput} />
      <section className='flex flex-row gap-3 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
