import '@/styles/globals.css'
import { GlobalProvider } from 'context/GlobalContext'
import 'focus-visible'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
