export const Container = ({ className, children }) => {
  return (
    <div
      className={`${className} flex flex-col w-full lg:h-full p-8 bg-accent overflow-hidden border border-gray-200 rounded-md justify-center relative morph-container`}
    >
      {children}
    </div>
  )
}
