import { useRef } from 'react'
import { CapitalInformaitonType } from './DailyPicture'

type PhotoComponentProps = {
  photo: any
  setChangeImage: any
  capitalInformation: CapitalInformaitonType | null
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

          {capitalInformation && (
            <div className='absolute top-2 left-2 bg-accent rounded-sm px-1'>{`${
              capitalInformation?.capital
            }, ${capitalInformation?.countryName}, ${
              capitalInformation.population &&
              new Intl.NumberFormat().format(
                parseInt(capitalInformation?.population)
              )
            } Einw.`}</div>
          )}
        </div>
      ) : (
        'Keine Bilder gefunden!'
      )}
    </>
  )
}
