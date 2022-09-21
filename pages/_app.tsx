// @ts-nocheck
import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
// import { MoralisProvider } from 'react-moralis'

import { GlobalProvider } from 'context/GlobalContext'
import ContractsProvider from 'providers/ContractsProvider'
import IPFSProvider from 'providers/IPFSProvider'
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <WagmiConfig client={client}>
        <ContractsProvider>
          <IPFSProvider>
            {/* <MoralisProvider
              appId={process.env.NEXT_PUBLIC_APP_ID!}
              serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
            > */}
            <Component {...pageProps} />
            {/* </MoralisProvider> */}
          </IPFSProvider>
        </ContractsProvider>
      </WagmiConfig>
    </GlobalProvider>
  )
}

export default MyApp
