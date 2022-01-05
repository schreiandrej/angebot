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
import { Tab } from '@headlessui/react'

type HomeProps = {
  preisebdev: any
  preisliste: any
  weatherData: any
  plzListboxOptions: OptionsType[]
  dataCountries: Countries
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home({}: // preisebdev,
// preisliste,
// weatherData,
// plzListboxOptions,
// dataCountries,
HomeProps) {
  const [stateScreen, setStateScreen] = useState({
    calc: true,
    chart: false,
    weather: false,
    updateISN: false,
  })

  let [sections] = useState({
    calculator: 'Calculator',
    vorkasse: 'Vorkasse',
  })

  const [calcVorkasse, setCalcVorkasse] = useState(true)

  return (
    <main className='flex flex-col w-full justify-center items-center gap-3 p-6 text-base lg:h-screen bg-base'>
      {/* <div className='col-start-1 col-end-5 row-start-1 row-end-7'>
        <Sidebar
          preisliste={preisliste}
          weatherData={weatherData}
          setStateScreen={setStateScreen}
          plzListboxOptions={plzListboxOptions}
          dataCountries={dataCountries}
        />
      </div> */}
      {/* 
      <Tab.Group>
        <Tab.List className='flex p-1 space-x-1 bg-blue-900/20 rounded-xl'>
          {Object.keys(sections).map((section) => (
            <Tab
              key={section}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium rounded-lg focus:outline-none',
                  selected
                    ? 'bg-accent shadow text-white text-xl'
                    : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-400'
                )
              }
            >
              {section}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='relative flex flex-col items-center justify-center w-full h-full'>
          <Tab.Panel className='w-1/2'>
            <Calculator />
          </Tab.Panel>
          <Tab.Panel className='w-1/2'> */}
      <Vorkasse />
      {/* </Tab.Panel> */}
      {/* <Tab.Panel className='w-full'>
            <LineChart
              preisliste={preisliste}
              plzListboxOptions={plzListboxOptions}
            />
          </Tab.Panel> */}
      {/* <Tab.Panel className='w-full'>
            <WeatherForcast weatherData={weatherData} />
          </Tab.Panel> */}
      {/* <Tab.Panel className='w-full'>
            <UpdateISN />
          </Tab.Panel> */}
      {/* </Tab.Panels>
      </Tab.Group> */}
    </main>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   // fetch news
//   // const articles = await scraperNews()

//   // fetch isn pricelist
//   let doc = null
//   const { db } = await connectToDatabase()
//   try {
//     doc = await db
//       .collection('preisliste')
//       .find({})
//       .sort({ Datum: 1 })
//       .toArray()
//   } catch (err) {
//     console.log(`Error: ${err}`)
//   }

//   const preisArray = JSON.parse(JSON.stringify(doc))

//   // fetch bdev preise
//   const preisebdev = await scraperBDEV()

//   // fetch countries
//   const countriesUrl =
//     'https://gist.githubusercontent.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a/raw/f621703926fc13be4f618fb4a058d0454177cceb/countries.json'
//   const resCountries = await fetch(countriesUrl)
//   const dataCountries = await resCountries.json()

//   // wether data
//   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.945438364155955&lon=8.862723792633542&exclude=current,minutely,hourly&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_ID}`
//   const res = await fetch(url)
//   const data = await res.json()
//   const weatherData = await data.daily

//   const plzListboxOptions: OptionsType[] = []
//   getPostleitzahlArray(preisArray).map((item, index) =>
//     plzListboxOptions.push({
//       id: index,
//       name: item,
//       value: item,
//       unavailable: false,
//     })
//   )

//   return {
//     props: {
//       preisebdev,
//       // articles,
//       preisliste: JSON.parse(JSON.stringify(doc)),
//       weatherData,
//       plzListboxOptions,
//       dataCountries,
//     },
//   }
// }
