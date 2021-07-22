import { useContext, createContext, useState, ReactNode } from 'react'

const SearchPictureModalState = createContext(null)
const SearchedWord = createContext(null)
const ChangeImage = createContext(null)

export const ContextProvider = ({ children }: any) => {
  const [modalState, setModalState] = useState(false)
  const [searchWord, setSearchWord] = useState('coffee')
  const [changeImage, setChangeImage] = useState(false)

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
