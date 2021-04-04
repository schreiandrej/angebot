export const ListItem = ({ gebiet, plz, price }) => {
  return (
    <li className='flex flex-row items-center justify-between'>
      <span className='flex-grow'>{gebiet}</span>
      <span className='flex-shrink text-xs'>plz: {plz}</span>
      <span className='flex-shrink  pl-8'>{price}</span>
    </li>
  )
}
