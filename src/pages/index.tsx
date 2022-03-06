import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { OutputSection } from '@/components/OutputSection'
import { ButtonSubmit } from '@/components/Buttons/ButtonSubmit'
import { ButtonDelete } from '@/components/Buttons/ButtonDelete'
import { ListboxComponent } from '@/components/Listbox'
import CopyToClipboard from 'react-copy-to-clipboard'
import { copyTable } from 'src/lib/copyTable'

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

export default function Home() {
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

  const transformPreis = (preis: string) => {
    const replacedComma = preis.replace(',', '.')
    return parseFloat(replacedComma) < 1
      ? parseFloat(replacedComma)
      : parseFloat(replacedComma) / 100
  }

  const onSubmit = (data: { preis: string; liter: string; adr: string }) => {
    const preis = transformPreis(data.preis)

    setFormState({
      ...formState,
      liter: parseFloat(data.liter),
      literpreis: parseFloat(JSON.stringify(preis)),
      zuschlag: selectedOption.value,
      adr: Boolean(data.adr) === true ? 11 : 0,
    })

    copyTable()
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
    <main className='flex flex-col w-full justify-center items-center gap-3 p-6 text-base lg:h-screen bg-base'>
      <section className='w-3/5'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row gap-5'>
            <div className='relative w-full flex flex-col'>
              <label htmlFor='preis' className=''>
                Preis/l
              </label>
              <input
                type='number'
                name='preis'
                id='preis'
                // label='Preis/l'
                step='0.01'
                // inputStyles='w-full h-12'
                // labelStyles='px-4'
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
            <div className='relative w-full flex flex-col'>
              <label htmlFor='liter' className=''>
                Liter
              </label>
              <input
                type='text'
                name='liter'
                // label='Liter'
                id='liter'
                // inputStyles='w-full h-12'
                // labelStyles='px-4'
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
          </div>
          <div className='flex w-full'>
            <Controller
              control={control}
              role='zuschlag'
              name='zuschlag'
              defaultValue={selectedOption}
              render={() => (
                <ListboxComponent
                  options={listOptions}
                  className='h-12'
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
                data-testid='adr'
                className={`text-gray-500 bg-transparent rounded-sm`}
                ref={register}
                defaultChecked
              />
              <label htmlFor='adr' className='text-xs'>
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
            <ButtonSubmit />
            <ButtonDelete deleteResults={clearForm} />
          </div>
        </form>
      </section>
    </main>
  )
}
