import { tankvolumenOptions } from '@/utils/variables'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { ListboxComponent } from '../Listbox'

interface Props {
  control: any
}

export const InputTankvolumen = ({ control }: Props) => {
  const [tankvolumenOption, setTankvolumenOption] = useState(
    tankvolumenOptions[0]
  )
  return (
    <>
      <Controller
        control={control}
        role='tankvolumen'
        name='tankvolumen'
        defaultValue={tankvolumenOption}
        render={() => (
          <ListboxComponent
            options={tankvolumenOptions}
            className='h-12'
            selectedOption={tankvolumenOption}
            setSelectedOption={setTankvolumenOption}
          />
        )}
      />
    </>
  )
}
