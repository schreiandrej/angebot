export const WeatherWidget = ({ weatherData }) => {
  const dayTemp = weatherData[0].temp.day
  const maxTemp = weatherData[0].temp.max
  const weatherDescription = weatherData[0].weather[0].description

  console.log(maxTemp)

  return (
    <button className='flex flex-col items-end gap-1 hover:text-hover active:text-active focus:outline-none'>
      <div>{weatherDescription}</div>
      <div>{`${maxTemp}°C`}</div>
    </button>
  )
}
