export const Title = ({ className, children }) => {
  return (
    <h2
      className={`${className} pb-3 font-semibold dark:font-normal text-heading uppercase`}
    >
      {children}
    </h2>
  )
}
