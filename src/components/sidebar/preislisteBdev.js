export const PreislisteBdev = ({ preisebdev }) => {
  const convert = (numberString) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(numberString.replace(',', '.')))
  return (
    <div className='text-lg w-full'>
      <h4 className='text-2xl mb-6'>Preise des BDEV: </h4>
      <ul>
        {preisebdev.map((item, index) => (
          <li
            key={index}
            className='flex flex-row items-center justify-between'
          >
            <span className='flex-grow'>{Object.keys(item)[0]}</span>
            <span className='flex-shrink text-xs'>
              {item[Object.keys(item)[0]].plz.split(',').length > 4
                ? item[Object.keys(item)[0]].plz.slice(-22)
                : item[Object.keys(item)[0]].plz}
            </span>
            <span className='flex-shrink  pl-8'>
              {convert(item[Object.keys(item)[0]].netto1000)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
