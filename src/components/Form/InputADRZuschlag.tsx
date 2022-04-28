interface Props {
  register: any
}

export const InputADRZuschlag = ({ register }: Props) => {
  return (
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
  )
}
