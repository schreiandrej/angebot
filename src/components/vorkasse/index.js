import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OutputSection } from '@/components/vorkasse/outputSection'
import { ButtonSubmit } from '@/components/base/buttons/buttonSubmit'
import { ButtonDelete } from '@/components/base/buttons/buttonDelete'
import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { Input } from '@/components/base/forms/input'
import { Select } from '@/components/base/forms/select'

export const Vorkasse = ({ className }) => {
  const { handleSubmit, reset, register, errors, clearErrors } = useForm()
  const [formState, setFormState] = useState({
    liter: 0,
    literpreis: 0,
    zuschlag: 0,
    adr: 0,
  })
  const [totalAmount, setTotalAmount] = useState(0)

  const clearForm = () => {
    reset()
    clearErrors(['liter', 'preis'])
  }

  const onSubmit = (data) => {
    const replacedCommaa = data.preis?.replace(',', '.')
    const preis =
      parseFloat(replacedCommaa) < 1
        ? parseFloat(replacedCommaa)
        : parseFloat(replacedCommaa) / 100

    setFormState({
      ...formState,
      liter: parseFloat(data.liter),
      literpreis: parseFloat(preis),
      zuschlag: parseFloat(data.zuschlag),
      adr: Boolean(data.adr) === true ? 11 : 0,
    })
  }

  useEffect(() => {
    setTotalAmount(
      (formState.literpreis * formState.liter +
        formState.zuschlag +
        formState.adr) *
        1.19
    )
  }, [formState])

  return (
    <Container className={`${className}`}>
      <Title className='mb-4'>vorkasse</Title>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full relative'>
          <Input
            type='text'
            name='liter'
            label='Liter'
            inputStyles='w-full'
            autoComplete='off'
            register={register({
              required: true,
              min: 0,
              max: 24000,
            })}
          />
          {errors?.liter?.type === 'required' && (
            <p className='text-xs text-red-600 absolute -top-5 right-0'>
              Bitte die Litermenge angeben!
            </p>
          )}
          {/* {errors?.liter?.type === 'max' && (
          <p className='text-xs text-red-600'>Die Litermenge ist zu groß!</p>
        )}
        {errors?.liter?.type === 'min' && (
          <p className='text-xs text-red-600'>
            So wening liefern wir nicht aus!
          </p>
        )} */}
        </div>
        <div className='w-full relative'>
          <Input
            type='text'
            name='preis'
            label='Preis/l'
            inputStyles='w-full'
            autoComplete='off'
            register={register({
              required: 'Bitte ein Preis eingeben',
            })}
          />
          {errors?.preis && (
            <p className='text-xs text-red-600 absolute -top-5 right-0'>
              {errors.preis.message}
            </p>
          )}
        </div>
        <Select
          label='Zuschlag'
          name='zuschlag'
          register={register}
          inputStyles='w-full'
          options={[
            { option: '', value: 0 },
            { option: 'Teilmenge', value: 30 },
            { option: 'Mindermenge', value: 165 },
          ]}
        />

        <div className='flex gap-2 items-center w-full justify-end'>
          <input
            type='checkbox'
            id='adr'
            name='adr'
            className={`text-transparent rounded-sm`}
            ref={register}
            defaultChecked
          />
          <label htmlFor='adr' className=' text-xs'>
            ADR-Zuschlag
          </label>
        </div>

        <div className=' flex flex-row my-4 gap-2'>
          <ButtonSubmit className='w-full' />
          <ButtonDelete clearForm={clearForm} />
        </div>
      </form>
      <OutputSection
        liter={formState.liter}
        preisProLiter={formState.literpreis}
        preis={totalAmount}
        zuschlag={formState.zuschlag}
        adr={formState.adr}
      ></OutputSection>
    </Container>
  )
}
