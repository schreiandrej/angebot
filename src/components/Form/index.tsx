import { useEffect } from 'react'
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
import { IOptionsType, IForm, IOutput } from '../../types'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setStateOnSubmit'
import { RadioTankvolumen } from './Inputs/RadioTankvolumen'

export const FormComponent = () => {
  const [tankvolumen, setTankvolumen] = useState<number>(
    tankvolumenOptions[1].value
  )
  const [emptyFieldsError, setEmptyFieldsError] = useState<boolean>(false)
  const [addMengenzuschlagInfo, setAddMengenzuschlagInfo] =
    useState<boolean>(false)

  const [formState, setFormState] = useState<IForm>(initialFormState)

  const {
    handleSubmit,
    reset,
    register,
    control,
    setFocus,
    formState: { errors },
    clearErrors,
  } = useForm()

  useEffect(() => {
    setFocus('literpreis', { shouldSelect: true })
  }, [setFocus])

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])

    setFormState(initialFormState)
  }

  const onSubmit = (data: any) => {
    const transformData = (data: any) => {
      const transformedData: any = initialFormState

      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.length > 0) {
          transformedData[key] = Number((value as string).replace(',', '.'))
        } else if (key === 'guthaben' && value === '') {
          transformedData[key] = 0
        } else {
          transformedData[key] = null
        }
      }

      return transformedData
    }

    if (data) {
      if (
        data.liefermenge === '' &&
        data.vorkasse === '' &&
        data.füllstand === ''
      ) {
        setEmptyFieldsError(true)
      } else {
        setEmptyFieldsError(false)

        if (data.vorkasse !== '') {
          setAddMengenzuschlagInfo(true)
        } else {
          setAddMengenzuschlagInfo(false)
        }

        setFormState(
          setStateOnSubmit(formState, transformData(data), tankvolumen)
        )
      }
    }
  }

  return (
    <form
      className='relative flex flex-col gap-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      {emptyFieldsError && (
        <div className='absolute -top-10 right-0 text-sm  text-red-500 font-semibold'>
          Bitte einen der Werte "Füllstand", "Liefermenge" oder "Vorkasse"
          eingeben.
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
              <div className='relative'>
                {addMengenzuschlagInfo && formState.mengenzuschlag < 1 && (
                  <p className='absolute flex w-full -top-5 text-xs   text-red-500 font-semibold'>
                    Mengenzuschlag hinzufügen?
                  </p>
                )}
                <InputMengenzuschlag register={register} errors={errors} />
              </div>
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
