import { ReactNode } from 'react'
import Head from 'next/head'

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
        <link
          rel='preload'
          href='/frutiger-lt-cufonfonts-webfont/Frutiger-LT-45-Light.woff'
          as='font'
          crossOrigin=''
        />
        <title>Vorkasse</title>
      </Head>
      {children}
    </>
  )
}
