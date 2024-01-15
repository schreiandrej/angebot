import { useEffect } from 'react'
import { initialFormState, tankvolumenOptions } from '@/utils/variables'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  InputGefahrgutzuschlag,
  InputEnergiezuschlag,
  InputFüllstand,
  InputLiefermenge,
  InputPreis,
  InputVorkasse,
  InputMengenzuschlag,
  InputGuthaben,
  InputCheckboxMengenzuschlag,
  InputCheckboxADRZuschlag,
} from './Inputs'
import { OutputSection } from '../Output/OutputSection'
import { IOptionsType, IForm, IOutput } from '../../types'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setStateOnSubmit'
import { RadioTankvolumen } from './Inputs/RadioTankvolumen'
import { copyTable } from '@/utils/copyTable'

export const FormComponent = () => {
  const [tankvolumen, setTankvolumen] = useState<number>(
    tankvolumenOptions[2].value
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
        } else if (typeof value === 'boolean') {
          transformedData[key] = value
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

  useEffect(() => {
    copyTable()
  }, [formState])

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
      <section className='flex flex-col gap-3'>
        <div className='flex flex-row w-full gap-6'>
          <div className='flex flex-col w-full gap-2'>
            <InputPreis register={register} errors={errors} />
            <InputFüllstand register={register} />
          </div>
          <div className='flex flex-col w-full gap-3'>
            <InputVorkasse register={register} errors={errors} />
            <InputLiefermenge register={register} />
          </div>
          <div className='flex flex-col w-full gap-3'>
            <div className='relative'>
              {addMengenzuschlagInfo && formState.mengenzuschlag < 1 && (
                <p className='absolute flex w-full -top-5 text-xs   text-red-500 font-semibold'>
                  Mengenzuschlag hinzufügen?
                </p>
              )}
              <InputMengenzuschlag register={register} errors={errors} />
            </div>
            <InputGuthaben register={register} />
          </div>
          <div className='flex flex-col gap-3'>
            <InputGefahrgutzuschlag register={register} errors={errors} />
            <InputEnergiezuschlag register={register} errors={errors} />
          </div>
        </div>
        <div className='flex w-full gap-3 h-full justify-end'>
          <InputCheckboxMengenzuschlag register={register} errors={errors} />
          <InputCheckboxADRZuschlag register={register} errors={errors} />
        </div>
        <RadioTankvolumen
          control={control}
          tankvolumen={tankvolumen}
          setTankvolumen={setTankvolumen}
        />
      </section>
      <OutputSection formState={formState as IOutput} />
      <section className='flex flex-row gap-3 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
