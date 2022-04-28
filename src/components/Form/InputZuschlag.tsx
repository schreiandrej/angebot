import { IOptionsType } from '../../types/'
import { listOptions } from '@/utils/variables'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { ListboxComponent } from '../Listbox'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  control: Control<FieldValues>
  selectedOption: IOptionsType
  setSelectedOption: Dispatch<SetStateAction<IOptionsType>>
}

export const InputZuschlag = ({
  control,
  selectedOption,
  setSelectedOption,
}: Props) => {
  return (
    <>
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
    </>
  )
}
