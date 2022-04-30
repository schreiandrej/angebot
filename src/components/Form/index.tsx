import {
  initialFormState,
  mengezuschlagOptions,
  tankvolumenOptions,
} from '@/utils/variables'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  InputADRZuschlag,
  InputDieselzuschlag,
  InputFüllstand,
  InputLiefermenge,
  InputPreis,
  InputTankvolumen,
  InputVorkasse,
  InputZuschlag,
} from './Inputs'
import { OutputSection } from './OutputSection'
import { IOptionsType, IForm, IFormData } from '../../types'
import { ButtonSubmit, ButtonDelete } from '../Buttons'
import { setStateOnSubmit } from '@/utils/setState'

export const FormComponent = () => {
  const [mengenzuschlag, setMengenzuschlag] = useState<IOptionsType>(
    mengezuschlagOptions[0]
  )
  const [tankvolumen, setTankvolumen] = useState<IOptionsType>(
    tankvolumenOptions[1]
  )
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
    if (data)
      setFormState(
        setStateOnSubmit(formState, data, tankvolumen, mengenzuschlag)
      )
  }

  return (
    <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
      <section className='flex flex-col gap-5'>
        <div className='flex flex-row w-full gap-3'>
          <div className='flex flex-col w-full gap-2'>
            <InputVorkasse register={register} errors={errors} />
            <InputPreis register={register} errors={errors} />
          </div>
          <div className='flex flex-col w-full gap-2'>
            <InputLiefermenge register={register} />
            <InputFüllstand register={register} />
          </div>
        </div>
        <div className='flex flex-col w-full gap-5'>
          <div className='flex flex-row gap-5'>
            <div className='flex flex-row w-full gap-3'>
              <InputZuschlag
                control={control}
                mengenzuschlag={mengenzuschlag}
                setMengenzuschlag={setMengenzuschlag}
              />
              <InputTankvolumen
                control={control}
                tankvolumen={tankvolumen}
                setTankvolumen={setTankvolumen}
              />
            </div>
            <div className='flex flex-row w-full justify-end gap-3'>
              <InputADRZuschlag register={register} />
              <InputDieselzuschlag register={register} />
            </div>
          </div>
        </div>
      </section>
      <OutputSection formState={formState} />
      <section className='flex flex-row gap-3 '>
        <ButtonSubmit />
        <ButtonDelete deleteResults={clearForm} />
      </section>
    </form>
  )
}
