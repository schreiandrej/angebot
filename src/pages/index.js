import { useState } from 'react'
import { Calculator } from '@/components/calculator'
import { Vorkasse } from '@/components/vorkasse'
import { LineChart } from '@/components/priceChart'
import { News } from '@/components/news'
import { WeatherForcast } from '@/components/weather'
import scraperBDEV from '@/components/sidebar/scraper'
import scraperNews from '@/components/news/scraper'
import { connectToDatabase } from '@/utils/dbConnection'
import { Sidebar } from '@/components/sidebar/index'

export default function Home({
  preisebdev,
  articles,
  preisliste,
  weatherData,
}) {
  const [showContent, setShowContent] = useState(true)

  return (
    <main className='flex flex-col lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 lg:gap-3 lg:h-screen p-4 w-full bg-base text-base'>
      <div className='col-start-1 col-end-5 row-start-1 row-end-7'>
        <Sidebar
          preisebdev={preisebdev}
          preisliste={preisliste}
          setShowContent={() => setShowContent(!showContent)}
        />
      </div>
      {showContent ? (
        <div className='flex flex-col lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 lg:gap-3 lg:h-full w-full realative col-start-5 col-end-13 row-start-1 row-end-7'>
          <div className='col-start-1 col-end-7 row-start-1 row-end-5'>
            <Calculator />
          </div>
          <div className='col-span-6 row-start-1 row-end-7'>
            <Vorkasse />
          </div>
          <div className='col-start-1 col-end-7 row-start-5 row-end-7'>
            <News articles={articles} />
          </div>
        </div>
      ) : (
        <div className='col-start-5 col-end-13 row-start-1 row-end-7'>
          <LineChart preisliste={preisliste} className='' />
        </div>
      )}
    </main>
  )
}

export async function getStaticProps() {
  // fetch news
  const articles = await scraperNews()

  // fetch isn pricelist
  let doc = null
  const { db } = await connectToDatabase()
  try {
    doc = await db.collection('preisliste').find({}).sort().toArray()
  } catch (err) {
    console.log(`Error: ${err}`)
  }

  // fetch bdev preise
  const preisebdev = await scraperBDEV()

  // wether data
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.945438364155955&lon=8.862723792633542&exclude=current,minutely,hourly&units=metric&lang=de&appid=0e3c8e20a71d95e79c8837ed8b306239`
  const res = await fetch(url)
  const data = await res.json()
  const weatherData = await data.daily

  return {
    props: {
      preisebdev,
      articles,
      preisliste: JSON.parse(JSON.stringify(doc)),
      weatherData,
    }, // will be passed to the page component as props
  }
}
