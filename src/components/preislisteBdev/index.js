import { Title } from '@/components/base/title'
import { useState, useEffect } from 'react'
import { Container } from '../base/container'
import { ListboxComponent } from '../base/headlessUI/listbox'

// { id: 1, name: 'Durward Reynolds', value: x, unavailable: false }

export const SelectPreislisteBdev = ({ preisebdev }) => {
  const [selectedOption, setSelectedOption] = useState(preisebdev[0])

  if (!selectedOption) return <div>loading....</div>

  return (
    <Container className='flex flex-col w-full items-center gap-2'>
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

export const PreislisteBdev = ({ preisebdev }) => {
  const convert = (numberString) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(numberString.replace(',', '.')))
  return (
    <div className='text-lg w-full'>
      <Title className='text-2xl mb-6'>Preise des BDEV: </Title>
      <ul>
        {preisebdev.map((item, index) => (
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
