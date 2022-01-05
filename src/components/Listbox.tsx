import { Listbox, Transition } from '@headlessui/react'

type OptionsType = {
  id: number
  name: string
  value: number
  unavailable: boolean
}

type ListboxComponentProps = {
  options: OptionsType[]
  selectedOption: OptionsType
  setSelectedOption: any
  className?: string
}

export const ListboxComponent = ({
  options,
  selectedOption,
  setSelectedOption,
}: ListboxComponentProps) => {
  return (
    <Listbox
      as='div'
      value={selectedOption.value}
      onChange={(e) => {
        setSelectedOption(e)
      }}
      className='relative w-full'
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={`w-full border border-gray-400 hover:border-hover focus:outline-none active:ring-gray-600 focus:ring-ring-gray-600 focus:ring-1 active:ring-1 rounded-lg p-1`}
          >
            {selectedOption.name}
          </Listbox.Button>
          {/* Use the Transition + open render prop argument to add transitions. */}
          <Transition
            show={open}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-300 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Listbox.Options
              static
              className='absolute w-full text-center focus:outline-none bg-white overflow-visible'
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.name}
                  value={option}
                  disabled={option.unavailable}
                  className='cursor-pointer hover:text-gray-400 my-3'
                >
                  {option.name !== selectedOption.name && option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}

export const CheckmarkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      width='10'
      height='10'
      className={`${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 13l4 4L19 7'
      />
    </svg>
  )
}
