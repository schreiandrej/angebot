// import { useRef } from 'react'

// export default function Home() {
//   const imageRef = useRef(null)

//   const copyImage = async () => {
//     const imageSrc = imageRef.current?.src
//     console.log(imageSrc)

//     if (imageSrc) await copyImg(imageSrc)
//   }

//   return (
//     <div className='flex flex-col justify-center items-center w-screen h-screen bg-base text-base'>
//       <button type='button' onClick={copyImage}>
//         klick
//       </button>
//       <img
//         src={'/img.jpg'}
//         alt='Picture of the author'
//         width={500}
//         height={500}
//         ref={imageRef}
//       />
//     </div>
//   )
// }

export function copyToClipboard(blob: any) {
  if (blob) {
    const clipboardItem = new ClipboardItem({ [blob.type]: blob })
    navigator.clipboard.write([clipboardItem])
  }
}

export function convertToPngAndCopyToClipboard(imgBlob: any) {
  const imageUrl = window.URL.createObjectURL(imgBlob)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const imageEl = document.createElement('img')
    imageEl.src = imageUrl

    imageEl.crossOrigin = 'anonymous'

    imageEl.onload = ({ target }) => {
      const { width, height }: any = target

      canvas.width = width
      canvas.height = height(ctx as any).drawImage(target, 0, 0, width, height)
      canvas.toBlob(copyToClipboard, 'image/png', 1)
    }
  }
}

export async function copyImg(imgSrc: any) {
  const response = await fetch(`${imgSrc}?crossorigin`)
  const blob = await response.blob()

  if (
    imgSrc.endsWith('.jpg') ||
    imgSrc.endsWith('.jpeg') ||
    blob.type === 'image/jpeg' ||
    blob.type === 'image/jpg'
  ) {
    convertToPngAndCopyToClipboard(blob)
  } else if (imgSrc.endsWith('.png') || blob.type === 'image/png') {
    copyToClipboard(blob)
  }
}
