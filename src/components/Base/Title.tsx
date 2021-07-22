type TitleProps = {
  className?: string
  children: string
}

export const Title = ({ className, children }: TitleProps) => {
  return (
    <h2 className={`${className} pb-3 text-heading text-lg`}>{children}</h2>
  )
}
