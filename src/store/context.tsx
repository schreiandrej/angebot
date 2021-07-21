import { useContext, createContext, useState } from 'react'

const SearchPictureModalState = createContext(false)
const SearchedWord = createContext('coffee')
const ChangeImage = createContext(false)

export const ContextProvider = ({ children }) => {
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
