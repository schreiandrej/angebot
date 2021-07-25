import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { unsplashApi } from './unsplashApi'
import { SearchButton } from './SearchButton'
import { PhotoComponent } from './PhotoComponent'
import { getUnsplashPicture } from './unsplashApi'
import {
  useSearchPictureModal,
  useSearchedWord,
  useChagenImage,
} from '@/store/context'
import { Photos } from 'unsplash-js/dist/methods/search/types/response'
import { ApiResponse } from 'unsplash-js/dist/helpers/response'
import { Countries, Country } from '@/types/types'

export type CapitalInformaitonType = {
  capital: string
  continentName?: string
  countryName?: string
  currencyCode?: string
  population?: string
}

type SearchModalProps = {
  dataCountries: Countries
  capitalInfomation: CapitalInformaitonType | null
  setCapitalInformation: Dispatch<SetStateAction<CapitalInformaitonType | null>>
}

export const DailyPicture = ({
  dataCountries,
  capitalInfomation,
  setCapitalInformation,
}: SearchModalProps) => {
  const [data, setPhotosResponse] = useState<ApiResponse<Photos> | null>(null)
  const { searchWord, setSearchWord } = useSearchedWord()
  const { modalState, setModalState } = useSearchPictureModal()
  const { changeImage, setChangeImage } = useChagenImage()

  useEffect(() => {
    const { countries } = dataCountries
    const allCountries = countries.country
    const biggerCountries = allCountries.filter(
      (country: Country) => parseInt(country.population) > 10000000
    )

    const randomNumber = Math.floor(Math.random() * biggerCountries.length + 1)
    const selctedCountry = biggerCountries[randomNumber]
    setSearchWord(selctedCountry.capital)
    setCapitalInformation({
      capital: `${selctedCountry.capital}`,
      continentName: `${selctedCountry.continentName}`,
      countryName: `${selctedCountry.countryName}`,
      currencyCode: `${selctedCountry.currencyCode}`,
      population: `${selctedCountry.population}`,
    })

    getUnsplashPicture(selctedCountry.capital, setPhotosResponse)
  }, [])

  useEffect(() => {
    if (searchWord) {
      getUnsplashPicture(searchWord, setPhotosResponse)
    }
  }, [changeImage])

  if (data === null) {
    return <div>Loading...</div>
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col gap-2 relative'>
        <SearchButton
          className={`opacity-0 group-hover:opacity-100`}
          setModalState={setModalState}
        />
        <PhotoComponent
          setChangeImage={setChangeImage}
          photo={data.response.results[0]}
          capitalInformation={capitalInfomation}
        />
      </div>
    )
  }
}
