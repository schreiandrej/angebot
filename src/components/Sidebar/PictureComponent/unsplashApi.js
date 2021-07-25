import { createApi } from 'unsplash-js'


export const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS,
})


 export const getUnsplashPicture = (searchWord, setPhotosResponse) => {
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
  }