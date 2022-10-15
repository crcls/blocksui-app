// @ts-nocheck
import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'

import { GlobalProvider } from '@/context/GlobalContext'
import Web3Provider from '@/providers/Web3Provider'
import AccountProvider from '@/providers/AccountProvider'
import ContractsProvider from '@/providers/ContractsProvider'
import IPFSProvider from '@/providers/IPFSProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Web3Provider>
        <AccountProvider>
          <ContractsProvider>
            <IPFSProvider>
              <Component {...pageProps} />
            </IPFSProvider>
          </ContractsProvider>
        </AccountProvider>
      </Web3Provider>
    </GlobalProvider>
  )
}

export default MyApp
