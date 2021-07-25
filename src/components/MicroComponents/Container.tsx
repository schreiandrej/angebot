import { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children: ReactNode
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={`${className} flex flex-col w-full lg:h-full p-8 bg-accent overflow-hidden border border-base rounded-md justify-center relative`}
    >
      {children}
    </div>
  )
}
