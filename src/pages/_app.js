import { Layout } from 'src/layout/layout'
import { ContextProvider } from '@/store/context'
import '@/styles/index.css'
import 'react-datepicker/dist/react-datepicker.css'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ContextProvider>
  )
}

export default MyApp
