export const ISNPreis = ({ isnpreis, className }) => {
  return (
    <div
      className={`hidden md:flex flex-col items-start justify-evenly w-full ${className}`}
    >
      <h2 className='text-base text-xl mb-6'>{`ISN-Preis: ${isnpreis} Cent/l`}</h2>
    </div>
  )
}
