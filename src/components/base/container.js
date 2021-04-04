export const Container = ({ className, children }) => {
  return (
    <div
      className={`${className} flex flex-col w-full lg:h-full p-8 overflow-hidden border border-base rounded-md items-center justify-center relative `}
    >
      {children}
    </div>
  )
}
