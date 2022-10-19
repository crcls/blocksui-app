// @ts-nocheck
import '@/styles/globals.css'
import 'focus-visible'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GlobalProvider } from '@/context/GlobalContext'
import Web3Provider from '@/providers/Web3Provider'
import AccountProvider from '@/providers/AccountProvider'
import ContractsProvider from '@/providers/ContractsProvider'
import IPFSProvider from '@/providers/IPFSProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ContractsProvider>
        <Web3Provider>
          <AccountProvider>
            <IPFSProvider>
              <DndProvider backend={HTML5Backend}>
                <Component {...pageProps} />
              </DndProvider>
            </IPFSProvider>
          </AccountProvider>
        </Web3Provider>
      </ContractsProvider>
    </GlobalProvider>
  )
}

export default MyApp
