import { useState } from 'react'
import { Calculator } from '@/components/calculator'
import { Vorkasse } from '@/components/vorkasse'
import { Preise } from '@/components/pricelist'
import { LineChart } from '@/components/priceChart'
import { News } from '@/components/news'
import { WeatherForcast } from '@/components/weather'
import { DarkModeToggle } from '@/components/base/darkModeToggle'
import scraperBDEV from '@/components/pricelist/scraper'
import scraperNews from '@/components/news/scraper'
import { connectToDatabase } from '@/utils/dbConnection'

export default function Home({ result, articles, preisliste, weatherData }) {
  const [showWeather, setShowWether] = useState(false)

  return (
    <main className='flex flex-col lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 lg:gap-3 p-4 lg:h-screen w-full realative bg-base text-base'>
      <Calculator className='col-start-4 col-end-8 row-start-1 row-end-5 ' />
      <Vorkasse className='col-span-3 row-start-1 row-end-7' />
      <News
        articles={articles}
        className=' col-start-8 col-end-13 row-start-1 row-end-3 z-10 bg-transparent'
      />
      <Preise
        data={result}
        className='col-start-4 col-end-8 row-start-5 row-end-7'
      />
      <div className='relative col-start-8 col-end-13 row-start-3 row-end-7'>
        <button
          type='button'
          onClick={() => setShowWether(!showWeather)}
          className='button-outlined absolute top-2 right-2 z-10'
        >
          {!showWeather ? 'Wetter' : 'Preise'}
        </button>
        {showWeather ? (
          <WeatherForcast weatherData={weatherData} />
        ) : (
          <LineChart preisliste={preisliste} />
        )}
      </div>
      {/* <DarkModeToggle /> */}
    </main>
  )
}

export async function getStaticProps() {
  let doc = null
  const bdevPreise = await scraperBDEV()
  const articles = await scraperNews()

  const { db } = await connectToDatabase()
  try {
    doc = await db.collection('preisliste').find({}).sort().toArray()
  } catch (err) {
    console.log(`Error: ${err}`)
  }

  const result = { ...bdevPreise }

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.945438364155955&lon=8.862723792633542&exclude=current,minutely,hourly&units=metric&lang=de&appid=0e3c8e20a71d95e79c8837ed8b306239`

  const res = await fetch(url)
  const data = await res.json()

  const weatherData = await data.daily

  return {
    props: {
      result,
      articles,
      preisliste: JSON.parse(JSON.stringify(doc)),
      weatherData,
    }, // will be passed to the page component as props
  }
}
