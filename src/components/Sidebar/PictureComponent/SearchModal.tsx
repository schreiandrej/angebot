import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import {
  useSearchPictureModal,
  useSearchedWord,
  useChagenImage,
} from '@/store/context'
import { Country } from './types'

type SearchModalProps = {
  setCapitalInformation: Dispatch<SetStateAction<Country | null>>
}
type InputData = {
  searchWord: string
}

export function SearchModal({ setCapitalInformation }: SearchModalProps) {
  const { modalState, setModalState } = useSearchPictureModal()
  const { setSearchWord } = useSearchedWord()
  const { changeImage, setChangeImage } = useChagenImage()

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: InputData) => {
    if (data.searchWord.length > 0) {
      setSearchWord(data.searchWord)
      setChangeImage(!changeImage)
      closeModal()
      setCapitalInformation({
        capital: data.searchWord,
      })
    }
  }

  function closeModal() {
    setModalState(false)
  }

  return (
    <Transition appear show={modalState} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-accent border border-base rounded-md shadow-xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-heading pb-4'
              >
                Was für ein Bild möchtest du sehen?
              </Dialog.Title>
              <Dialog.Description as='div' className='text-base'>
                <form
                  className='flex flex-col w-full gap-2'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type='text'
                    name='searchWord'
                    placeholder='search'
                    autoComplete='off'
                    className='w-full'
                    ref={register}
                  />
                  <div className='flex flex-row justify-end gap-2'>
                    <button
                      type='button'
                      className='button-outlined'
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                    <button type='submit' className='button-outlined'>
                      get it!
                    </button>
                  </div>
                </form>
              </Dialog.Description>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
