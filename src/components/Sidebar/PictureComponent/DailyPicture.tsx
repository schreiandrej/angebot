import { useState, useEffect, useRef, MouseEventHandler } from 'react'
import { unsplashApi } from './unsplashApi'
import { SearchButton } from './SearchButton'
import {
  useSearchPictureModal,
  useSearchedWord,
  useChagenImage,
} from '@/store/context'
import { Photos } from 'unsplash-js/dist/methods/search/types/response'
import { ApiResponse } from 'unsplash-js/dist/helpers/response'
import { Countries, Country } from '@/types/types'

type CapitalInformaitonType = {
  capital: string
  continentName: string
  countryName: string
  currencyCode: string
  population: string
}

type PhotoCompProps = {
  photo: any
  setChangeImage: any
  capitalInformation: CapitalInformaitonType | null
}

type SearchModalProps = {
  dataCountries: Countries
}

/**
 * TODO - On initial load we see a coffe picture, but it needs to be a capital
 */

const PhotoComp = ({
  photo,
  setChangeImage,
  capitalInformation,
}: PhotoCompProps) => {
  const { user, urls } = photo
  const imageRef = useRef(null)

  return (
    <div className='relative'>
      {urls && (
        <img
          src={urls.regular}
          className='cursor-pointer rounded-lg'
          ref={imageRef}
          onClick={setChangeImage}
          alt='Photo of a capital city'
        />
      )}
      {user && (
        <a
          className='absolute bottom-2 right-2 bg-accent rounded-md px-1'
          target='_blank'
          href={`https://unsplash.com/@${user.username}`}
        >
          {user.name}
        </a>
      )}
      {capitalInformation && (
        <div className='absolute top-2 left-2 bg-transparent'>{`${capitalInformation?.capital}, ${capitalInformation?.countryName}, ${capitalInformation?.population}, ${capitalInformation?.currencyCode}`}</div>
      )}
    </div>
  )
}

export const DailyPicture = ({ dataCountries }: SearchModalProps) => {
  const [data, setPhotosResponse] = useState<ApiResponse<Photos> | null>(null)
  const { searchWord, setSearchWord } = useSearchedWord()
  const { modalState, setModalState } = useSearchPictureModal()
  const { changeImage, setChangeImage } = useChagenImage()
  const [capitalInfomation, setCapitalInfomation] =
    useState<CapitalInformaitonType | null>(null)

  useEffect(() => {
    const { countries } = dataCountries
    const allCountries = countries.country
    const biggerCountries = allCountries.filter(
      (country: Country) => parseInt(country.population) > 10000000
    )

    const randomNumber = Math.floor(Math.random() * biggerCountries.length + 1)
    const selctedCountry = biggerCountries[randomNumber]
    setSearchWord(selctedCountry.capital)
    setCapitalInfomation({
      capital: `${selctedCountry.capital}`,
      continentName: `${selctedCountry.continentName}`,
      countryName: `${selctedCountry.countryName}`,
      currencyCode: `${selctedCountry.currencyCode}`,
      population: `${selctedCountry.population}`,
    })
  }, [])

  useEffect(() => {
    unsplashApi.search
      .getPhotos({
        query: `${searchWord}`,
        orientation: 'landscape',
        page: Math.floor(Math.random() * 100),
        perPage: 1,
      })
      .then((result) => {
        setPhotosResponse(result)
      })
      .catch((error) => {
        console.log('something went wrong!', error)
      })

    // setCapitalInfomation(null)
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
        <PhotoComp
          setChangeImage={setChangeImage}
          photo={data.response.results[0]}
          capitalInformation={capitalInfomation}
        />
      </div>
    )
  }
}
