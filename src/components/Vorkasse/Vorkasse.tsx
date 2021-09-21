import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { OutputSection } from '@/components/Vorkasse/OutputSection'
import { ButtonSubmit } from '@/components/MicroComponents/Buttons/ButtonSubmit'
import { ButtonDelete } from '@/components/MicroComponents/Buttons/ButtonDelete'
import { Title } from '@/components/MicroComponents/Title'
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
    <section className='w-full'>
      {/* <Title className='mb-4'>Vorkasse</Title> */}
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='relative w-full'>
          <Input
            type='number'
            name='preis'
            label='Preis/l'
            step='0.01'
            max={1}
            inputStyles='w-full'
            autoComplete='off'
            ref={register({
              required: 'Bitte ein Preis eingeben',
            })}
          />
          {errors?.preis && (
            <p className='absolute right-0 text-xs text-red-600 -top-5'>
              {errors.preis.message}
            </p>
          )}
        </div>
        <div className='relative w-full'>
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
            <p className='absolute right-0 text-xs text-red-600 -top-5'>
              Bitte die Litermenge angeben!
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

          <div className='flex items-center justify-end w-full gap-2'>
            <input
              type='checkbox'
              id='adr'
              name='adr'
              className={`text-transparent rounded-sm`}
              ref={register}
              defaultChecked
            />
            <label htmlFor='adr' className='text-xs '>
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
        <div className='flex flex-row gap-2 my-4 '>
          <ButtonSubmit id='vorkasseSubmitButton' className='w-full' />
          <ButtonDelete id='vorkasseDeleteButton' deleteResults={clearForm} />
        </div>
      </form>
    </section>
  )
}
