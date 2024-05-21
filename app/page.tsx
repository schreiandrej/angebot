import { FormComponent } from './components/Form'

export default function Page() {
  return (
    <main className='flex flex-col w-full justify-center items-center gap-3 p-6 text-base lg:h-screen bg-base'>
      <section className='w-3/5'>
        <FormComponent />
      </section>
    </main>
  )
}
