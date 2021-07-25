import { useContext, createContext, useState } from 'react'

interface ISearchPictureModalState {
  modalState: boolean
  setModalState: (m: boolean) => void
}

interface ISearcedWord {
  searchWord: string | null
  setSearchWord: (w: string | null) => void
}

interface IChangeImage {
  changeImage: boolean
  setChangeImage: (i: boolean) => void
}

const SearchPictureModalState = createContext<ISearchPictureModalState>({
  modalState: false,
  setModalState: () => {},
})
const SearchedWord = createContext<ISearcedWord>({
  searchWord: null,
  setSearchWord: () => {},
})
const ChangeImage = createContext<IChangeImage>({
  changeImage: false,
  setChangeImage: () => {},
})

export const ContextProvider = ({ children }: any) => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [searchWord, setSearchWord] = useState<string | null>(null)
  const [changeImage, setChangeImage] = useState<boolean>(false)

  return (
    <SearchPictureModalState.Provider value={{ modalState, setModalState }}>
      <SearchedWord.Provider value={{ searchWord, setSearchWord }}>
        <ChangeImage.Provider value={{ changeImage, setChangeImage }}>
          {children}
        </ChangeImage.Provider>
      </SearchedWord.Provider>
    </SearchPictureModalState.Provider>
  )
}

export const useSearchPictureModal = () => useContext(SearchPictureModalState)
export const useSearchedWord = () => useContext(SearchedWord)
export const useChagenImage = () => useContext(ChangeImage)
