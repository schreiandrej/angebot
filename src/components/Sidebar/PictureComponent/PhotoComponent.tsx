import { useRef } from 'react'
import { Country } from './types'

type PhotoComponentProps = {
  photo: any
  setChangeImage: any
  capitalInformation: Country | null
}

export const PhotoComponent = ({
  photo,
  setChangeImage,
  capitalInformation,
}: PhotoComponentProps) => {
  const imageRef = useRef(null)

  return (
    <>
      {photo ? (
        <div className='relative'>
          <img
            src={photo.urls.regular}
            className='cursor-pointer rounded-lg'
            ref={imageRef}
            onClick={setChangeImage}
            alt='Photo of a capital city'
          />

          <a
            className='absolute bottom-2 right-2 bg-accent rounded-sm px-1'
            target='_blank'
            href={`https://unsplash.com/@${photo.user.username}`}
          >
            {photo.user.name}
          </a>

          <div className='absolute top-2 left-2 flex flex-row bg-accent rounded-sm px-1'>
            <div>{capitalInformation && `${capitalInformation?.capital}`}</div>

            <div>
              {capitalInformation?.continentName &&
                `, ${
                  capitalInformation?.countryName
                }: ${new Intl.NumberFormat().format(
                  parseInt(capitalInformation?.population)
                )} Einw.`}
            </div>
          </div>
        </div>
      ) : (
        'Keine Bilder gefunden. Versuchs nochmal!'
      )}
    </>
  )
}
