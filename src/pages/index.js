import { useState } from 'react'
import { Calculator } from '@/components/calculator'
import { Vorkasse } from '@/components/vorkasse'
import { LineChart } from '@/components/priceChart'
import scraperBDEV from '@/components/sidebar/scraper'
import scraperNews from '@/components/news/scraper'
import { connectToDatabase } from '@/utils/dbConnection'
import { Sidebar } from '@/components/sidebar'
import { WeatherForcast } from '@/components/weather'
import { UpdateISN } from '@/components/updateISN'
import { getPostleitzahlArray } from '@/components/priceChart/getPostleitzeitArray'

export default function Home({
  preisebdev,
  preisliste,
  weatherData,
  plzListboxOptions,
}) {
  const [stateScreen, setStateScreen] = useState({
    calc: true,
    chart: false,
    weather: false,
    updateISN: false,
  })

  return (
    <main className='flex flex-col lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 lg:gap-6 lg:h-screen p-6 w-full bg-base text-base'>
      <div className='col-start-1 col-end-5 row-start-1 row-end-7'>
        <Sidebar
          preisebdev={preisebdev}
          preisliste={preisliste}
          weatherData={weatherData}
          stateScreen={stateScreen}
          setStateScreen={setStateScreen}
          preisliste={preisliste}
          plzListboxOptions={plzListboxOptions}
        />
      </div>
      {(stateScreen.calc && (
        <div className='flex flex-col lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 lg:gap-6 lg:h-full w-full realative col-start-5 col-end-13 row-start-1 row-end-7'>
          <div className='col-span-6 row-span-6'>
            <Calculator />
          </div>
          <div className='col-span-6 row-span-6'>
            <Vorkasse />
          </div>
        </div>
      )) ||
        (stateScreen.chart && (
          <div className='col-start-5 col-end-13 row-start-1 row-end-7'>
            <LineChart
              preisliste={preisliste}
              plzListboxOptions={plzListboxOptions}
            />
          </div>
        )) ||
        (stateScreen.weather && (
          <div className='col-start-5 col-end-13 row-start-1 row-end-7'>
            <WeatherForcast weatherData={weatherData} />
          </div>
        )) ||
        (stateScreen.updateISN && (
          <div className='col-start-5 col-end-13 row-start-1 row-end-7'>
            <UpdateISN />
          </div>
        ))}
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

  const preisArray = JSON.parse(JSON.stringify(doc))

  // fetch bdev preise
  const preisebdev = await scraperBDEV()

  // wether data
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.945438364155955&lon=8.862723792633542&exclude=current,minutely,hourly&units=metric&lang=de&appid=0e3c8e20a71d95e79c8837ed8b306239`
  const res = await fetch(url)
  const data = await res.json()
  const weatherData = await data.daily

  const plzListboxOptions = []
  getPostleitzahlArray(preisArray).map((item, index) =>
    plzListboxOptions.push({
      id: index,
      name: item,
      value: item,
      unavailable: false,
    })
  )

  return {
    props: {
      preisebdev,
      articles,
      preisliste: JSON.parse(JSON.stringify(doc)),
      weatherData,
      plzListboxOptions,
    }, // will be passed to the page component as props
  }
}
