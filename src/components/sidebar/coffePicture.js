import { useState, useEffect, useRef } from 'react'
import { createApi } from 'unsplash-js'
import { copyImg } from './copyToClipboard'

const unsplashApi = createApi({
  accessKey: '65umxT49424gR-yCnG-e7GDQkE8DkJyrnt0VyorxUs4',
})

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo
  const imageRef = useRef(null)

  const copyImage = async () => {
    const imageSrc = imageRef.current?.src
    if (imageSrc) await copyImg(imageSrc)
  }

  return (
    <div className='relative'>
      <img
        src={urls.regular}
        className='cursor-pointer rounded-lg'
        ref={imageRef}
        onClick={copyImage}
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

  useEffect(() => {
    unsplashApi.search
      .getPhotos({
        query: 'coffee',
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
  }, [])

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
      <>
        <PhotoComp photo={data.response.results[0]} />
      </>
    )
  }
}
