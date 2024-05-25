'use client'

import { useEffect, useState } from 'react'
import { FormComponent } from './components/form'
import { initialValues } from './lib/constants'
import { OutputSection } from './components/output-section'
import { copyTable } from './lib/utils'

export type FormState = {
  literpreis: number | null
  liefermenge: number | null
  füllstand: number
  tankvolumen: number | null
  mengenzuschlag: number
  energiezuschlag: number
  gefahrgutzuschlag: number
  vorkasse: number | null
  guthaben: number | null
  gefahrgutzuschlag_checkbox: boolean
  mengenzuschlag_checkbox: boolean
}

export default function Page() {
  const [formState, setFormState] = useState<FormState>(initialValues)
  const [updateTimeStamp, setUpdateTimestamp] = useState<number>(0)
  useEffect(() => {
    copyTable()
  }, [updateTimeStamp])

  return (
    <main className='flex flex-col w-full h-screen items-center'>
      <section className='flex items-center justify-center w-full bg-accent h-full'>
        <FormComponent
          setFormState={setFormState}
          setUpdateTimestamp={setUpdateTimestamp}
        />
      </section>
      <section className='flex items-center justify-center w-full bg-background h-full'>
        <OutputSection formState={formState} />
      </section>
    </main>
  )
}
