import { useState, useRef, MutableRefObject } from 'react'
import { useForm } from 'react-hook-form'
import stringMath from 'string-math'
import composeRefs from '@seznam/compose-react-refs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Title } from '@/components/MicroComponents/Title'
import { ButtonSubmit } from '@/components/MicroComponents/Buttons/ButtonSubmit'
import { ButtonDelete } from '@/components/MicroComponents/Buttons/ButtonDelete'
import { CalculaterInput } from '@/components/Calculator/CalculaterInput'

interface InputDataObject {
  calc: string
}

export const Calculator = () => {
  const [calculation, setCalculation] =
    useState<{ convertResult: string; mathString: string }[] | null>(null)
  const { register, handleSubmit, errors, reset, setValue } = useForm()
  const calcInputRef = useRef(null)

  // to focus the input after one of the given result were copied
  const focusInput = (ref: any) => {
    if (ref) ref?.current.focus()
  }

  const regExpression = /[^a-zA-Z]/

  const onSubmit = (data: InputDataObject) => {
    if (data.calc !== '') {
      try {
        const formatedNumber = data.calc.replace(/,/gi, '.')
        const result = stringMath(formatedNumber)
        const convertResult = new Intl.NumberFormat('de-DE', {
          maximumSignificantDigits: 8,
          useGrouping: false,
        }).format(result)

        calculation
          ? setCalculation([
              ...calculation,
              { convertResult, mathString: data.calc },
            ])
          : setCalculation([{ convertResult, mathString: data.calc }])

        setValue('calc', result, { shouldValidate: true })
        focusInput(calcInputRef)
      } catch (error: any) {
        console.log('oh oh, we have some error!', error.message)
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
    <div className='flex flex-col items-center justify-center w-full'>
      {/* <Title className='justify-self-start'>Calculator</Title> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-between w-full h-full'
      >
        <div className='flex flex-col w-full'>
          <div className='relative'>
            <CalculaterInput
              register={composeRefs(
                register({
                  required: {
                    value: true,
                    message: 'Bitte einen Wert eingeben',
                  },
                  pattern: {
                    value: regExpression,
                    message: 'Bitte nur Zahlen und + - / * !',
                  },
                }),
                calcInputRef
              )}
              clearForm={clearForm}
            />
            {errors.calc && (
              <div className='absolute right-0 text-sm text-red-600 -top-6 '>
                {errors.calc.message}
              </div>
            )}
          </div>
          <div className='flex flex-col items-end justify-end w-full py-4 pl-3'>
            {calculation &&
              calculation.map((item, index) => {
                return (
                  <CopyToClipboard key={index} text={item.convertResult}>
                    <div className='flex flex-row justify-center w-full cursor-pointer hover:text-gray-500'>
                      <span>{item.mathString}</span>
                      <div className='flex flex-row'>
                        <span className='px-2'>=</span>
                        <span
                          className='font-semibold'
                          data-testid='result'
                          onClick={() => focusInput(calcInputRef)}
                        >
                          {item.convertResult}
                        </span>
                      </div>
                    </div>
                  </CopyToClipboard>
                )
              })}
          </div>
        </div>
        {/* <div className='flex flex-row w-full gap-2 lg:justify-end'>
          <ButtonSubmit id='calcSubmitButton' />
          <ButtonDelete id='calcDeleteButton' deleteResults={deleteResults} />
        </div> */}
      </form>
    </div>
  )
}
