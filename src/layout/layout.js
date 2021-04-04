import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { DarkModeToggle } from '@/components/base/darkModeToggle'

export function Layout({ children }) {
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
