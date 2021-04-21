import { useState } from 'react'
import { useForm } from 'react-hook-form'
import stringMath from 'string-math'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { ButtonSubmit } from '@/components/base/buttons/buttonSubmit'
import { ButtonDelete } from '@/components/base/buttons/buttonDelete'
import { CalcInput } from '@/components/calculator/calculaterInput'

export const Calculator = ({ className }) => {
  const [calculation, setCalculation] = useState(null)
  const { register, handleSubmit, errors, reset, setValue } = useForm()

  const regExpression = /[^a-zA-Z]/

  const onSubmit = (data) => {
    if (data.calc !== '') {
      try {
        const formatedNumber = data.calc.replace(/,/gi, '.')
        const unformatedResult = stringMath(formatedNumber)
        const result = new Intl.NumberFormat('de-DE', {
          maximumSignificantDigits: 8,
        }).format(unformatedResult)

        calculation
          ? setCalculation([...calculation, { result, mathString: data.calc }])
          : setCalculation([{ result, mathString: data.calc }])

        setValue('calc', result, { shouldValidate: true })
      } catch (error) {
        console.log('oh oh, we have some error!')
      }
    }
  }

  const clearForm = () => {
    reset()
  }

  const deleteResults = () => {
    setCalculation([])
    setValue('calc', '', { shouldValidate: true })
  }

  return (
    <Container className={`${className}`}>
      <Title className='justify-self-start'>Calculator</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full h-full justify-between'
      >
        <div className='flex flex-col w-full'>
          <div className='relative'>
            <CalcInput
              role='textbox'
              register={register({
                required: { value: true, message: 'Bitte einen Wert eingeben' },
                pattern: {
                  value: regExpression,
                  message: 'Bitte nur Zahlen und + - / * !',
                },
              })}
              clearForm={clearForm}
            />
            {errors.calc && (
              <div className='absolute -top-6 right-0 text-sm text-red-600 '>
                {errors.calc.message}
              </div>
            )}
          </div>
          <div className='flex flex-col w-full py-4 pl-3 justify-end items-end'>
            {calculation &&
              calculation.map((item, index) => {
                return (
                  <CopyToClipboard key={index} text={item.result}>
                    <div className='flex flex-row justify-start w-full cursor-pointer hover:text-gray-500'>
                      <span>{item.mathString}</span>
                      <div className='flex flex-row justify-start'>
                        <span className='px-2'>=</span>
                        <span className='font-semibold' data-testid='result'>
                          {item.result}
                        </span>
                      </div>
                    </div>
                  </CopyToClipboard>
                )
              })}
          </div>
        </div>
        <div className='flex flex-row gap-2 w-full lg:justify-end'>
          <ButtonSubmit />
          <ButtonDelete deleteResults={deleteResults} />
        </div>
      </form>
    </Container>
  )
}
