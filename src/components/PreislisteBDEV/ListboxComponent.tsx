import { Listbox, Transition } from '@headlessui/react'
import { OptionsType } from '@/types/types'

/**
 * @example
 * Options example
 * const people = [
 * { id: 1, name: 'Durward Reynolds', value: x, unavailable: false },
 * { id: 2, name: 'Kenton Towne', value: x, unavailable: false },
 * { id: 3, name: 'Therese Wunsch', value: x, unavailable: true },
 * ]
 */

type ListboxComponentProps = {
  options: OptionsType[]
  selectedOption: OptionsType
  setSelectedOption: any
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
      onChange={setSelectedOption}
      className='relative w-full'
    >
      {({ open }) => (
        <>
          <Listbox.Button className='w-full border border-base hover:border-hover focus:outline-none active:ring-active focus:ring-active focus:ring-1 active:ring-1 rounded-lg p-1'>
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
              className='absolute top-[-500%] w-full text-center py-2 focus:outline-none bg-base overflow-visible z-20'
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.name}
                  value={option}
                  disabled={option.unavailable}
                  className='cursor-pointer hover:text-hover hover:bg-hover my-3'
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
