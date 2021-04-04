export const Title = ({ className, children }) => {
  return (
    <h2
      className={`${className} text-xl pb-3 font-semibold dark:font-normal text-heading uppercase`}
    >
      {children}
    </h2>
  )
}
