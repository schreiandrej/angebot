import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Calculator } from '@/components/Calculator/Calculator'
import { Vorkasse } from '@/components/Vorkasse/Vorkasse'
import { LineChart } from '@/components/PriceChart/PriceChart'
import scraperBDEV from '@/components/Sidebar/scraper'
import { connectToDatabase } from '@/utils/dbConnection'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { WeatherForcast } from '@/components/Weather/Weather'
import { UpdateISN } from '@/components/UpdateISNPrice/UpdateISNPrice'
import { getPostleitzahlArray } from '@/components/PriceChart/getPostleitzeitArray'
import { OptionsType } from '@/types/types'
import { Countries } from '@/components/Sidebar/PictureComponent/types'

type HomeProps = {
  preisebdev: any
  preisliste: any
  weatherData: any
  plzListboxOptions: OptionsType[]
  dataCountries: Countries
}

export default function Home({
  preisebdev,
  preisliste,
  weatherData,
  plzListboxOptions,
  dataCountries,
}: HomeProps) {
  const [stateScreen, setStateScreen] = useState({
    calc: true,
    chart: false,
    weather: false,
    updateISN: false,
  })
  const [calcVorkasse, setCalcVorkasse] = useState(true)

  return (
    <main className='flex flex-col w-full gap-3 p-6 text-base lg:grid lg:grid-col-1 lg:grid-cols-12 lg:grid-rows-6 lg:gap-6 lg:h-screen bg-base'>
      <div className='col-start-1 col-end-5 row-start-1 row-end-7'>
        <Sidebar
          preisliste={preisliste}
          weatherData={weatherData}
          setStateScreen={setStateScreen}
          plzListboxOptions={plzListboxOptions}
          dataCountries={dataCountries}
        />
      </div>
      {(stateScreen.calc && (
        <div className='flex flex-col w-full col-start-5 col-end-13 row-start-1 row-end-7 gap-3 lg:h-full realative'>
          <div className='relative w-full h-full'>
            <button
              className='absolute z-20 text-xs top-1 right-12 button-outlined'
              onClick={() => setCalcVorkasse(!calcVorkasse)}
            >
              {calcVorkasse ? 'vorkasse' : 'calc'}
            </button>
            {calcVorkasse ? <Calculator /> : <Vorkasse />}
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

export const getStaticProps: GetStaticProps = async () => {
  // fetch news
  // const articles = await scraperNews()

  // fetch isn pricelist
  let doc = null
  const { db } = await connectToDatabase()
  try {
    doc = await db
      .collection('preisliste')
      .find({})
      .sort({ Datum: 1 })
      .toArray()
  } catch (err) {
    console.log(`Error: ${err}`)
  }

  const preisArray = JSON.parse(JSON.stringify(doc))

  // fetch bdev preise
  const preisebdev = await scraperBDEV()

  // fetch countries
  const countriesUrl =
    'https://gist.githubusercontent.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a/raw/f621703926fc13be4f618fb4a058d0454177cceb/countries.json'
  const resCountries = await fetch(countriesUrl)
  const dataCountries = await resCountries.json()

  // wether data
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.945438364155955&lon=8.862723792633542&exclude=current,minutely,hourly&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_ID}`
  const res = await fetch(url)
  const data = await res.json()
  const weatherData = await data.daily

  const plzListboxOptions: OptionsType[] = []
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
      // articles,
      preisliste: JSON.parse(JSON.stringify(doc)),
      weatherData,
      plzListboxOptions,
      dataCountries,
    },
  }
}
