import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/base/slider/arrows'

export const Slider = ({ children }) => {
  // ...
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
  }, [children])
  // ...

  // ...
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }
  // ...

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex relative'>
        {currentIndex > 0 && <ArrowLeft onClick={prev} />}
        <div className='w-full h-full overflow-hidden'>
          <div
            className={`flex w-full transition-transform  duration-300 ease-linear`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && <ArrowRight onClick={next} />}
      </div>
    </div>
  )
}
