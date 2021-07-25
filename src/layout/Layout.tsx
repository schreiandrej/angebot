import { ReactNode } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { DarkModeToggle } from '@/components/MicroComponents/DarkModeToggle'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <title>Dashboard</title>
      </Head>
      <ThemeProvider attribute='class'>
        <DarkModeToggle />
        {children}
      </ThemeProvider>
    </>
  )
}
