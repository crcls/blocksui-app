import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

import { GlobalProvider } from 'context/GlobalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <WagmiConfig client={client}>
        <MoralisProvider
          appId={process.env.NEXT_PUBLIC_APP_ID!}
          serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </WagmiConfig>
    </GlobalProvider>
  )
}

export default MyApp
