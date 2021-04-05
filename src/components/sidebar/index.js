import { useState } from 'react'
import { ISNPreis } from './isnPreis'
import format from 'date-fns/format'
import de from 'date-fns/locale/de'
import { PreislisteBdev } from './preislisteBdev'
import { useSortData } from '@/hooks/useSortData'
import { Container } from '@/components/base/container'

export const Sidebar = ({ preisebdev, preisliste, setShowContent }) => {
  const heute = new Date()

  const { postleitzahl, date, preis } = useSortData(preisliste, 33, heute)

  return (
    <Container className='items-start justify-between'>
      <div className=''>
        <h1 className='text-3xl'>Guten Morgen!</h1>
        <h2 className='text-2xl'>{format(heute, 'PPPP', { locale: de })}</h2>
      </div>
      <ISNPreis isnpreis={preis} setShowContent={setShowContent} />
      <PreislisteBdev preisebdev={preisebdev} />
    </Container>
  )
}
