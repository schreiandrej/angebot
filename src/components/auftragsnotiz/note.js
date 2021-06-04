import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/components/base/container'
import {
  Anrufnummer,
  EMail,
  PreisPro100Liter,
  Fuellstand,
  PreisGenannt,
  Sondervereinbarung,
  Bestellzeit,
} from './inputs'

export const Note = () => {
  const { register, handleSubmit, reset } = useForm()
  const [copyText, setCopyText] = useState()

  const onSubmit = (data) => {
    setCopyText({
      Telefon: data.anrufnummer,
      'E-mail': data.email,
      Bestellzeit: `${data.bestellzeit.slice(0, 2)}:${data.bestellzeit.slice(
        2,
        4
      )} Uhr`,
      Preis: `${data.preis} €`,
      Füllstand: `${data.fuellstand} %`,
      'Preis genannt': data.preisgenannt ? 'ja' : 'nein',
      Sondervereinbarung: data.sondervereinbarung,
    })
    reset()
  }

  useEffect(() => {
    if (copyText) {
      const normalizedString = JSON.stringify(copyText)
        .replace(/["{}]/g, '')
        .replaceAll(',', ', ')
        .replaceAll(':', ': ')
        .replace()

      console.log(normalizedString)

      navigator.clipboard.writeText(normalizedString)
    }
  }, [copyText])

  return (
    <Container>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Anrufnummer ref={register} />
        <EMail ref={register} />
        <Bestellzeit ref={register} />
        <PreisPro100Liter ref={register} />
        <Fuellstand ref={register} />
        <PreisGenannt ref={register} />
        <Sondervereinbarung ref={register} />
        <button type='submit' className='button-outlined'>
          copy
        </button>
      </form>
    </Container>
  )
}
