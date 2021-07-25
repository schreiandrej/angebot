import { Title } from '@/components/MicroComponents/Title'
import { useState } from 'react'
import { Container } from '../MicroComponents/Container'
import { ListboxComponent } from './ListboxComponent'

// { id: 1, name: 'Durward Reynolds', value: x, unavailable: false }

type PreiseBdevType = {
  preisebdev: any
}

export const SelectPreislisteBdev = ({ preisebdev }: PreiseBdevType) => {
  const [selectedOption, setSelectedOption] = useState(preisebdev[0])

  if (!selectedOption) return <div>loading....</div>

  return (
    <Container className='hidden md:flex flex-col w-full items-center gap-2 '>
      <ListboxComponent
        options={preisebdev}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div>{`${selectedOption.plz}`}</div>
      <div>{`${selectedOption.value}`}</div>
    </Container>
  )
}

export const PreislisteBdev = ({ preisebdev }: PreiseBdevType) => {
  const convert = (numberString: string) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(numberString.replace(',', '.')))
  return (
    <div className='text-lg w-full'>
      <Title className='text-2xl mb-6'>Preise des BDEV: </Title>
      <ul>
        {preisebdev.map((item: any, index: number) => (
          <li
            key={index}
            className='flex flex-row items-center justify-between'
          >
            <span className='flex-grow text-heading'>
              {Object.keys(item)[0]}
            </span>
            <span className='flex-shrink text-xs'>
              {item[Object.keys(item)[0]].plz.split(',').length > 4
                ? item[Object.keys(item)[0]].plz.slice(-22)
                : item[Object.keys(item)[0]].plz}
            </span>
            <span className='flex-shrink  pl-8'>
              {convert(item[Object.keys(item)[0]].netto1000)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
