import { Transition } from '@headlessui/react'
import { useState } from 'react'

export const TransitionExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className='button-outlined' onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>

      <Transition show={isOpen}>
        <Transition.Child
          enter='transition-opacity duration-1000'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-1000'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='overflow-hidden'
        >
          I will fade in and out
        </Transition.Child>
        <Transition.Child
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          Second Child
        </Transition.Child>
      </Transition>
    </>
  )
}
