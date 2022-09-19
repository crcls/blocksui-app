import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'
// import { MoralisProvider } from 'react-moralis'

import { GlobalProvider } from 'context/GlobalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      {/* <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID!}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
      > */}
      <Component {...pageProps} />
      {/* </MoralisProvider> */}
    </GlobalProvider>
  )
}

export default MyApp
