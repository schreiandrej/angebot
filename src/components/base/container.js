export const Container = ({ className, children }) => {
  return (
    <div
      className={`${className} flex flex-col w-full lg:h-full p-8 bg-accent overflow-hidden border border-base rounded-md justify-center relative`}
    >
      {children}
    </div>
  )
}
