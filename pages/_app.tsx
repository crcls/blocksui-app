// @ts-nocheck
import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'

import { GlobalProvider } from '@/context/GlobalContext'
import ContractsProvider from '@/providers/ContractsProvider'
import IPFSProvider from '@/providers/IPFSProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ContractsProvider>
        <IPFSProvider>
          <Component {...pageProps} />
        </IPFSProvider>
      </ContractsProvider>
    </GlobalProvider>
  )
}

export default MyApp
