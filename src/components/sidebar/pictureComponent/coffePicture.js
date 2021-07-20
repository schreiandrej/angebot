import { useState, useEffect, useRef } from 'react'
import { createApi } from 'unsplash-js'
import { SearchButton } from './searchButton'
import {useSearchPictureModal, useSearchedWord, useChagenImage} from '@/store/context'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS,
})

const PhotoComp = ({ photo, setChangeImage }) => {
  const { user, urls } = photo
  const imageRef = useRef(null)


  return (
    <div className='relative'>
      <img
        src={urls.regular}
        className='cursor-pointer rounded-lg'
        ref={imageRef}
        onClick={setChangeImage}
      />
      <a
        className='absolute bottom-2 right-2 bg-accent rounded-md px-1'
        target='_blank'
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </div>
  )
}

export const CoffePicOfTheDay = () => {
  const [data, setPhotosResponse] = useState(null)
  const { searchWord, setSearchWord } = useSearchedWord()
  const { modalState, setModalState } = useSearchPictureModal()
  const {changeImage, setChangeImage} = useChagenImage()

  

  useEffect(() => {
    unsplashApi.search
      .getPhotos({
        query: `${searchWord}`,
        orientation: 'landscape',
        page: Math.floor(Math.random() * 100),
        per_page: 1,
      })
      .then((result) => {
        setPhotosResponse(result)
      })
      .catch((error) => {
        console.log('something went wrong!', error)
      })
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
        <SearchButton className={`opacity-0 group-hover:opacity-100`} setModalState={setModalState} />
        <PhotoComp
          setChangeImage={setChangeImage}
          photo={data.response.results[0]}
        />
      </div>
    )
  }
}
