import type { AppProps } from 'next/app'
import { Layout } from 'src/layout/Layout'
import { ContextProvider } from '@/store/context'
import '@/styles/index.css'
import 'react-datepicker/dist/react-datepicker.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
