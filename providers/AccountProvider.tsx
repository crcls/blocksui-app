import { FC, useCallback, ReactNode, useEffect, useState } from 'react'
import { Signer } from '@ethersproject/abstract-signer'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { Web3Provider as W3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import AccountContext, {
  Account,
  EthProvider,
  Wallets,
} from 'context/AccountContext'
import { Networks } from 'context/Web3Context'
import { resolver } from 'utils/async'
import useWeb3 from 'hooks/use-web3'

const AccountProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    ethMainnetProvider,
    metamaskProvider,
    coinbaseProvider,
    walletConnectProvider,
    network,
  } = useWeb3()
  const [account, setAccount] = useState<Account | null>(null)
  const [provider, setProvider] = useState<EthProvider | null>(null)
  const [signer, setSigner] = useState<Signer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signOut = useCallback(async () => {
    if (provider !== null) {
      if (provider.disconnect !== undefined) {
        provider.disconnect()
      } else {
        // TODO: show toast alert
        console.log('You must manually disconnect your wallet.')
      }
      setProvider(null)
    }

    setAccount(null)
    setSigner(null)
  }, [provider])

  const signIn = useCallback(
    async (wallet: keyof typeof Wallets) => {
      let newProvider: EthProvider
      let newSigner: Signer

      if (
        wallet === Wallets.walletconnect &&
        walletConnectProvider !== undefined
      ) {
        try {
          await (
            walletConnectProvider.provider as WalletConnectProvider
          ).enable()
        } catch (e) {
          // TODO: show toast alert
          console.log(e)
        }
        newProvider = walletConnectProvider.provider as EthProvider
        newSigner = walletConnectProvider.getSigner()
      } else if (
        wallet === Wallets.metamask &&
        metamaskProvider !== undefined
      ) {
        newProvider = metamaskProvider.provider as EthProvider
        newSigner = metamaskProvider.getSigner()
      } else if (
        wallet === Wallets.coinbase &&
        coinbaseProvider !== undefined
      ) {
        newProvider = coinbaseProvider.provider as EthProvider
        newSigner = coinbaseProvider.getSigner()
      } else {
        throw new Error('Wallet not supported')
      }

      const [error, addresses] = await resolver<string[]>(
        newProvider.request<string[]>({ method: 'eth_requestAccounts' })
      )

      if (error || addresses === undefined) {
        console.error(error || 'No addresses')
        return
      }

      const newAccount = new Account(
        addresses[0],
        newSigner,
        ethMainnetProvider
      )

      setAccount(newAccount)
      setProvider(newProvider)
      setSigner(newSigner)
    },
    [
      walletConnectProvider,
      metamaskProvider,
      coinbaseProvider,
      ethMainnetProvider,
    ]
  )

  const initState = useCallback(
    async (newProvider: W3Provider) => {
      console.log('init state')
      const [error, accounts] = await resolver(
        (newProvider.provider as EthProvider).request({
          method: 'eth_accounts',
        })
      )

      if (error || accounts === undefined) {
        console.error(error?.message)
        // Probably don't need to do anything here.
      } else if ((accounts as string[]).length) {
        const [err, addresses] = await resolver<string[]>(
          (newProvider.provider as EthProvider).request({
            method: 'eth_requestAccounts',
          })
        )

        if (err || addresses === undefined) return

        const newAccount = new Account(
          addresses[0],
          newProvider.getSigner(),
          ethMainnetProvider
        )

        setAccount(newAccount)
        setProvider(newProvider.provider as EthProvider)
        setSigner(newProvider.getSigner())
      }
    },
    [ethMainnetProvider]
  )

  useEffect(() => {
    const newProvider = metamaskProvider || coinbaseProvider

    if (newProvider !== undefined && account === null) {
      initState(newProvider)
        .then(() => {
          setIsLoading(false)
        })
        .catch(console.error)
    }
  }, [account, metamaskProvider, coinbaseProvider, initState])

  useEffect(() => {
    if (provider && network) {
      const updateAccount = async (accounts: string[]) => {
        if (accounts.length) {
          const newAccount = new Account(
            accounts[0],
            new ethers.providers.Web3Provider(provider).getSigner(),
            ethMainnetProvider
          )
          setAccount(newAccount)
        } else {
          await signOut()
        }
      }
      const updateChain = (chainId: string) => {
        const cid = Number.parseInt(chainId)
        if (network && cid !== network) {
          const networkName = Networks[cid] || 'wrong'
          // TODO: show toast alert
          console.log(
            `You are connected to the ${networkName} network. Please connect to ${Networks[network]}.`
          )
        }
      }

      provider.on('accountsChanged', updateAccount)
      provider.on('chainChanged', updateChain)

      return () => {
        provider.removeListener('accountsChanged', updateAccount)
        provider.removeListener('chainChanged', updateChain)
      }
    }
  }, [provider, network, signOut, ethMainnetProvider])

  return (
    <AccountContext.Provider
      value={{
        account,
        isLoading,
        signer,
        signIn,
        signOut,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider
