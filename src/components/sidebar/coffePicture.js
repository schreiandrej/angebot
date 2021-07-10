import { useState, useEffect, useRef } from 'react'
import { createApi } from 'unsplash-js'
import { useForm } from 'react-hook-form'
const unsplashApi = createApi({
  accessKey: '65umxT49424gR-yCnG-e7GDQkE8DkJyrnt0VyorxUs4',
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
  const [changeImage, setChangeImage] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const [searchWord, setSearchWord] = useState('coffee')

  const onSubmit = (data) => {
    console.log(data.searchWord.length)
    
    if (data.searchWord.length > 0) { 
      console.log('i am here');
      
      setSearchWord(data.searchWord)
      setChangeImage(!changeImage)
  }
  }

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
      <div className='flex flex-col gap-2'>
        <form
          className='flex flex-row w-full gap-2 max-h-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type='text'
            name='searchWord'
            placeholder='search'
            className='w-2/3'
            ref={register}
          />
          <button type='submit' className='button-outlined w-1/3 m-0'>
            search
          </button>
        </form>
        <PhotoComp
          setChangeImage={setChangeImage}
          photo={data.response.results[0]}
        />
      </div>
    )
  }
}
