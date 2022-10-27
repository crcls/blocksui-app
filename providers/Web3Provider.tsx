import { FC, ReactNode, useEffect, useState } from 'react'
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
  NETWORKS,
  NativeProvider,
  Web3Context,
} from 'context/Web3Context'
import { resolver } from 'utils/async'

function apiKeyForNetwork(network: string): string {
  switch (network) {
    case 'ethereum':
      return process.env.MAINNET_ALCHEMY_API || ''
    case 'goerli':
      return process.env.GOERLI_ALCHEMY_API || ''
    case 'mumbai':
      return process.env.MUMBAI_ALCHEMY_API || ''
    default:
      return process.env.POLYGON_ALCHEMY_API || ''
  }
}

export function initAlchemyEnhancedApiProvider(
  network: string
): AlchemyEnhancedApiProvider {
  const apiKey = apiKeyForNetwork(network)
  const baseUrl = `https://polygon-${network}.g.alchemy.com/v2/${apiKey}`

  return {
    async send(
      method: string,
      params?: { [param: string]: any }
    ): Promise<{ [key: string]: any }> {
      let url = `${baseUrl}/${method}`

      if (params !== undefined) {
        const urlParams = new URLSearchParams(params)
        url = `${url}?${urlParams.toString()}`
      }

      return await fetch(url).then((response) => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Failed to fetch from alchemy')
      })
    },
  }
}

export function initWalletConnectProvider(network: Networks): W3Provider {
  const provider = new WalletConnectProvider({
    rpc: {
      1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ETHEREUM_ALCHEMY_API}`,
      5: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_API}`,
      137: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY_API}`,
      80001: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_API}`,
    },
    chainId: network,
  })

  return new ethers.providers.Web3Provider(provider)
}

const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState<Networks | undefined>()
  const [fetchingGasRates, setFetchingGasRates] = useState(false)
  // Use this for API calls
  const [alchemyEnhancedApiProvider] = useState(
    initAlchemyEnhancedApiProvider(NETWORKS[process.env.ENV || 'production'])
  )
  // Use this for reading from the archive nodes
  const [alchemyWsProvider, setAlchemyWsProvider] = useState<
    WebSocketProvider | undefined
  >()
  // Use this for reading from the archive nodes on Ethereum Mainnet
  const [ethMainnetProvider] = useState(
    ethers.providers.AlchemyProvider.getWebSocketProvider(
      1,
      process.env.ETHEREUM_ALCHEMY_API
    )
  )
  // Use this for injected providers to sign and send transactions
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
      let net = Networks.mumbai // TODO: switch to mainnet

      if (process.env.ENV === 'development' || subdomain === 'testnets') {
        net = Networks.mumbai
      }

      setNetwork(net)
    } else {
      setWalletConnectProvider(initWalletConnectProvider(network))
      setAlchemyWsProvider(
        ethers.providers.AlchemyProvider.getWebSocketProvider(
          network,
          apiKeyForNetwork(NETWORKS[process.env.ENV || 'production'])
        )
      )
    }
  }, [network])

  const ctx = {
    alchemyEnhancedApiProvider,
    alchemyWsProvider,
    ethMainnetProvider,
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
