import { Dispatch, SetStateAction, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { tankvolumenOptions } from '../../../utils/variables'
import { Controller } from 'react-hook-form'

interface Props {
  control: any
  tankvolumen: number
  setTankvolumen: Dispatch<SetStateAction<number>>
}

export const RadioTankvolumen = ({
  control,
  tankvolumen,
  setTankvolumen,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        name='tankvolumen'
        defaultValue={tankvolumenOptions[1].value}
        render={() => (
          <RadioGroup value={tankvolumen} onChange={setTankvolumen}>
            <RadioGroup.Label className=''>Tankvolumen</RadioGroup.Label>
            <div className='flex flex-row gap-4 w-full justify-between'>
              {tankvolumenOptions.map((tank) => (
                <RadioGroup.Option
                  key={tank.id}
                  value={tank.value}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : ''
                    }
                  ${
                    checked
                      ? 'bg-slate-400 bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative w-full flex cursor-pointer rounded-lg py-2 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <div className='flex w-full text-sm items-center justify-center'>
                      <RadioGroup.Label
                        as='p'
                        className={`font-medium  ${
                          checked ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {tank.name}
                      </RadioGroup.Label>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      />
    </>
  )
}
