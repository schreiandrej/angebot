import { IOptionsType } from '../../../types/'
import { mengezuschlagOptions } from '@/utils/variables'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { ListboxComponent } from '../../Listbox'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  control: Control<FieldValues>
  mengenzuschlag: IOptionsType
  setMengenzuschlag: Dispatch<SetStateAction<IOptionsType>>
}

export const InputZuschlag = ({
  control,
  mengenzuschlag,
  setMengenzuschlag,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        name='mengenzuschlag'
        defaultValue={mengenzuschlag}
        render={() => (
          <ListboxComponent
            options={mengezuschlagOptions}
            className='h-12'
            selectedOption={mengenzuschlag}
            setSelectedOption={setMengenzuschlag}
          />
        )}
      />
    </>
  )
}
