import { FC, useEffect, useState } from 'react'
import * as ethers from 'ethers'
import {
  WebSocketProvider,
  Web3Provider as W3Provider,
} from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import store from 'store2'

import {
  AlchemyEnhancedApiProvider,
  GasRates,
  Networks,
  NativeProvider,
  Web3Context,
} from '@/context/Web3Context'
import { resolver } from '@/utils/async'

export function initAlchemyEnhancedApiProvider(): AlchemyEnhancedApiProvider {
  const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`

  return {
    async send(
      method: string,
      params?: { [param: string]: any }
    ): Promise<Object> {
      let url = `${baseUrl}/${method}`

      if (params !== undefined) {
        const urlParams = new URLSearchParams(params[0])
        url = `${url}?${urlParams.toString()}`
      }

      return await fetch(url).then((response) => response.json())
    },
  }
}

export function initWalletConnectProvider(network: Networks): W3Provider {
  const provider = new WalletConnectProvider({
    infuraId: process.env.INFURA_ID,
    chainId: network,
  })

  return new ethers.providers.Web3Provider(provider)
}

const Web3Provider: FC = ({ children }) => {
  const [network, setNetwork] = useState<Networks | undefined>()
  const [fetchingGasRates, setFetchingGasRates] = useState(false)
  // Use this for API calls
  const [alchemyEnhancedApiProvider] = useState(
    initAlchemyEnhancedApiProvider()
  )
  // Use this for reading from the archive nodes
  const [alchemyWsProvider] = useState(
    ethers.providers.AlchemyProvider.getWebSocketProvider(
      1,
      process.env.ALCHEMY_ID
    )
  )
  // Use this for contract interaction
  const [infuraWsProvider, setInfuraWsProvider] = useState<
    WebSocketProvider | undefined
  >()
  // Use this or injected providers to sign and send transactions
  const [walletConnectProvider, setWalletConnectProvider] = useState<
    W3Provider | undefined
  >()
  const [metamaskProvider, setMetamaskProvider] = useState<
    W3Provider | undefined
  >()
  const [coinbaseProvider, setCoinbaseProvider] = useState<
    W3Provider | undefined
  >()
  const [gasRates, setGasRates] = useState<GasRates | null>(null)
  const [gasFailed, setGasFailed] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      // If more than one ETH wallet is installed
      if (window.ethereum.providers) {
        window.ethereum.providers.forEach((provider: NativeProvider) => {
          if (provider.isMetaMask) {
            setMetamaskProvider(new ethers.providers.Web3Provider(provider))
          } else if (provider.isCoinbaseWallet) {
            setCoinbaseProvider(new ethers.providers.Web3Provider(provider))
          }
        })
      } else if (window.ethereum.isMetaMask) {
        setMetamaskProvider(new ethers.providers.Web3Provider(window.ethereum))
      } else if (window.ethereum.isCoinbaseWallet) {
        setCoinbaseProvider(new ethers.providers.Web3Provider(window.ethereum))
      }
    }
  }, [])

  useEffect(() => {
    const fetchGasRates = async () => {
      setFetchingGasRates(true)

      const [gasError, gasResp] = await resolver(
        fetch(
          // `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_ID}`
          'https://api.gasprice.io/v1/estimates'
        ).then((data) => {
          if (data.ok) {
            return data.json()
          } else {
            throw new Error(data.statusText)
          }
        })
      )

      if (gasError || gasResp === undefined || gasResp.error) {
        console.error(
          gasError?.message ||
            gasResp?.error ||
            'Failed to fetch from the gasoracle'
        )
        setGasFailed(true)
        return
      }

      const newGasRates = {
        fast: Number.parseFloat(gasResp.result.fast.feeCap),
        limit: Number.parseFloat(gasResp.result.instant.feeCap),
        date: Date.now() + 60000,
        ethUsd: Number.parseFloat(gasResp.result.ethPrice),
      }
      setGasRates(newGasRates)
      store.set('gasRates', newGasRates)
      setFetchingGasRates(false)
    }

    if (
      !fetchingGasRates &&
      !gasFailed &&
      navigator.userAgent !== 'ReactSnap'
    ) {
      if (gasRates === null && !fetchingGasRates) {
        const newGasRates = store.get('gasRates')

        if (newGasRates && newGasRates.date > Date.now()) {
          setGasRates(newGasRates)
        } else {
          fetchGasRates().catch(console.error)
        }
      }
    }
  }, [fetchingGasRates, gasRates, gasFailed])

  useEffect(() => {
    if (network === undefined) {
      const hostParts = location.host.split('.')
      const subdomain = hostParts.shift() as string
      let net = Networks.mumbai // TODO: make this configurable

      Object.values(Networks).forEach((netId) => {
        if (Networks[netId as number] === subdomain) net = netId as Networks
      })

      setNetwork(net)
    } else {
      setInfuraWsProvider(
        ethers.providers.InfuraProvider.getWebSocketProvider(
          network,
          process.env.INFURA_ID
        )
      )
      setWalletConnectProvider(initWalletConnectProvider(network))
    }
  }, [network])

  const ctx = {
    alchemyEnhancedApiProvider,
    alchemyWsProvider,
    infuraWsProvider,
    walletConnectProvider,
    metamaskProvider,
    coinbaseProvider,
    gasRates,
    gasFailed,
    network,
  }

  return <Web3Context.Provider value={ctx}>{children}</Web3Context.Provider>
}

export default Web3Provider
