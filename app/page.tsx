'use client'

import { useEffect, useState } from 'react'
import { FormComponent } from './components/form'
import { initialValues } from './lib/constants'
import { OutputSection } from './components/output-section'
import { copyTable } from './lib/utils'

const dynamic = 'force-dynamic'
const revalidate = 0

export type FormState = {
  literpreis: number | null
  liefermenge: number | null
  füllstand: number | null
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

  useEffect(() => {
    copyTable()
  }, [formState])

  return (
    <main className='flex flex-col w-full h-screen items-center'>
      <section className='flex items-center justify-center w-full bg-accent h-full'>
        <FormComponent formState={formState} setFormState={setFormState} />
      </section>
      <section className='flex items-center justify-center w-full bg-background h-full'>
        <OutputSection formState={formState} />
      </section>
    </main>
  )
}
