import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/components/MicroComponents/Container'
import {
  Anrufnummer,
  EMail,
  PreisPro100Liter,
  Fuellstand,
  PreisGenannt,
  Sondervereinbarung,
  Fixmenge,
} from './Inputs'

type FormData = {
  anrufnummer: string
  email: string
  preis: string
  fuellstand: string
  preisgenannt: string
  fixmenge: string
  sondervereinbarung: string
}

export const Note = () => {
  const { register, handleSubmit, reset } = useForm()
  const [copyText, setCopyText] = useState<string | null>(null)

  const onSubmit = (data: FormData) => {
    setCopyText(
      `${data.fixmenge ? 'FIX ' + data.fixmenge + ' Liter' : 'Voll'}, Preis ${
        data.preis
      }€, genannt: ${data.preisgenannt ? 'JA' : 'NEIN'}, FS ${
        data.fuellstand
      }%, ${data.sondervereinbarung ? data.sondervereinbarung : ''} ${
        data.anrufnummer && data.anrufnummer
      }${data.email && data.email}`
    )
    reset()
  }

  useEffect(() => {
    if (copyText) {
      const normalizedString = JSON.stringify(copyText)
        .replace(/["{}]/g, '')
        .replaceAll(',', ', ')

      console.log(normalizedString)

      navigator.clipboard.writeText(normalizedString)
    }
  }, [copyText])

  return (
    <Container>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <PreisPro100Liter ref={register} />
        <Fuellstand ref={register} />
        <Fixmenge ref={register} />
        <PreisGenannt ref={register} />
        <Sondervereinbarung ref={register} />
        <Anrufnummer ref={register} />
        <EMail ref={register} />
        <button type='submit' className='button-outlined'>
          copy
        </button>
      </form>
    </Container>
  )
}
