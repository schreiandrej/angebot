import { tankvolumenOptions } from '@/utils/variables'
import { Dispatch, SetStateAction, useState } from 'react'
import { Controller } from 'react-hook-form'
import { IOptionsType } from 'src/types'
import { ListboxComponent } from '../../Listbox'

interface Props {
  control: any
  tankvolumen: IOptionsType
  setTankvolumen: Dispatch<SetStateAction<IOptionsType>>
}

export const InputTankvolumen = ({
  control,
  tankvolumen,
  setTankvolumen,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        role='tankvolumen'
        name='tankvolumen'
        defaultValue={tankvolumen}
        render={() => (
          <ListboxComponent
            options={tankvolumenOptions}
            className='h-12'
            selectedOption={tankvolumen}
            setSelectedOption={setTankvolumen}
          />
        )}
      />
    </>
  )
}
