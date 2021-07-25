import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { OutputSection } from '@/components/Vorkasse/OutputSection'
import { ButtonSubmit } from '@/components/MicroComponents/Buttons/ButtonSubmit'
import { ButtonDelete } from '@/components/MicroComponents/Buttons/ButtonDelete'
import { Title } from '@/components/MicroComponents/Title'
import { Container } from '@/components/MicroComponents/Container'
import { ListboxComponent } from '@/components/Vorkasse/Listbox'
import { Input } from 'sa-tw-lib'

const listOptions = [
  { id: 1, name: 'Kein Zuschlag', value: 0, unavailable: false },
  { id: 1, name: 'Teilmenge', value: 49, unavailable: false },
  { id: 1, name: 'Mindermenge', value: 165, unavailable: false },
]

interface IForm {
  liter: number
  literpreis: number
  zuschlag: number
  adr: number
}

export const Vorkasse = ({ className }: { className?: string }) => {
  const [selectedOption, setSelectedOption] = useState(listOptions[0])
  const { handleSubmit, reset, register, control, errors, clearErrors } =
    useForm()
  const [formState, setFormState] = useState<IForm>({
    liter: 0,
    literpreis: 0,
    zuschlag: 0,
    adr: 0,
  })
  const [totalAmount, setTotalAmount] = useState(0)

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

  const onSubmit = (data: { preis: string; liter: string; adr: string }) => {
    const replacedCommaa = data.preis?.replace(',', '.')
    const preis =
      parseFloat(replacedCommaa) < 1
        ? parseFloat(replacedCommaa)
        : parseFloat(replacedCommaa) / 100

    setFormState({
      ...formState,
      liter: parseFloat(data.liter),
      literpreis: parseFloat(data.preis),
      zuschlag: selectedOption.value,
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
      <Title className='mb-4'>Vorkasse</Title>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full relative'>
          <Input
            type='text'
            name='liter'
            label='Liter'
            inputStyles='w-full'
            autoComplete='off'
            ref={register({
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
        </div>
        <div className='w-full relative'>
          <Input
            type='text'
            name='preis'
            label='Preis/l'
            inputStyles='w-full'
            autoComplete='off'
            ref={register({
              required: 'Bitte ein Preis eingeben',
            })}
          />
          {errors?.preis && (
            <p className='text-xs text-red-600 absolute -top-5 right-0'>
              {errors.preis.message}
            </p>
          )}
        </div>
        <div className='flex w-full'>
          <Controller
            control={control}
            name='zuschlag'
            defaultValue={selectedOption}
            render={() => (
              <ListboxComponent
                options={listOptions}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            )}
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
        </div>
        <OutputSection
          liter={formState.liter}
          preisProLiter={formState.literpreis}
          preis={totalAmount}
          zuschlag={formState.zuschlag}
          adr={formState.adr}
        ></OutputSection>
        <div className=' flex flex-row my-4 gap-2'>
          <ButtonSubmit id='vorkasseSubmitButton' className='w-full' />
          <ButtonDelete id='vorkasseDeleteButton' deleteResults={clearForm} />
        </div>
      </form>
    </Container>
  )
}
