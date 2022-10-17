import { FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { ethers, Contract } from 'ethers'
import store from 'store2'

import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthenticatedPage from '@/components/AuthenticatedPage'

import useAccount from '@/hooks/use-account'
import useContracts from '@/hooks/use-contracts'
import { ApiKeysHeader } from '@/components/ApiKeysPage'

interface ApiKey {
  domain: string
  id: string
  key?: string
}

function buildKey(domain: string): ApiKey {
  const id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domain))
  return {
    domain,
    id,
  }
}

enum ACTION {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE_KEY = 'update_key',
}

interface Action {
  type: ACTION
  index: number
}

interface AddKey extends Action {
  type: ACTION.ADD
  key: ApiKey
}

interface UpdateKey extends Action {
  type: ACTION.UPDATE_KEY
  key: string
}

interface RemoveKey extends Action {
  type: ACTION.REMOVE
}

type ActionType = AddKey | UpdateKey | RemoveKey

function reducer(state: ApiKey[], action: ActionType) {
  const newState = [...state]

  switch (action.type) {
    case ACTION.ADD: {
      newState.splice(action.index, 0, action.key)
      return newState
    }
    case ACTION.UPDATE_KEY:
      newState[action.index].key = action.key
      return newState
    case ACTION.REMOVE:
      newState.splice(action.index, 1)
      return newState
    default:
      return state
  }
}

const ApiKeys: NextPage = () => {
  const { contractsLoaded, getContract } = useContracts()
  const { account } = useAccount()

  const [keys, dispatch] = useReducer(reducer, [])
  const [contract, setContract] = useState<Contract | undefined>()
  const [loadingOrigins, setLoadingOrigins] = useState(false)
  const [originsLoaded, setOriginsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signOrigin = useCallback(
    async (index: number) => {
      const keyData = keys[index]

      if (keyData) {
        const key = await account.signMessage(
          `BlocksUI wants you to authorize the domain:\n${keyData.domain}`
        )

        dispatch({ type: ACTION.UPDATE_KEY, index, key })
      }
    },
    [keys, account]
  )

  const loadOrigins = useCallback(async () => {
    if (contract && !loadingOrigins) {
      setLoadingOrigins(true)
      const origins = store.get(`origins:${account.address}`, [])
      const domains = await contract.originsForOwner(account.address)
      domains.forEach((domain: string) => {
        let key = buildKey(domain)

        for (let i = 0; i < origins.length; i++) {
          if (origins[i].domain === domain) {
            key = origins[i]
            break
          }
        }

        dispatch({
          type: ACTION.ADD,
          index: keys.length,
          key,
        })
      })
      setOriginsLoaded(true)
      setLoadingOrigins(false)
    }
  }, [account, contract, loadingOrigins, keys])

  const register = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError(null)

      if (contract) {
        const formData = new FormData(event.currentTarget)
        const domain = formData.get('domain')
        if (domain && domain !== '') {
          try {
            await contract.register(domain as string)
            dispatch({
              type: ACTION.ADD,
              index: 0,
              key: buildKey(domain as string),
            })
          } catch (e) {
            setError(e as Error)
          }
        }
      }
    },
    [contract, account]
  )

  useEffect(() => {
    if (account && contractsLoaded) {
      try {
        const contract = getContract('BUIOriginRegistry', account.signer)
        setContract(contract)
      } catch (e) {
        // TODO: Need an error state or redirect
        console.log(e)
      }
    }
  }, [contractsLoaded, getContract, account])

  useEffect(() => {
    if (contract) {
      loadOrigins().catch(console.error)
    }
  }, [contract])

  useEffect(() => {
    if (account && originsLoaded) {
      store.set(`origins:${account.address}`, keys)
    }
  }, [keys, account, originsLoaded])

  return (
    <AuthenticatedPage>
      <Head>
        <title>Blocks UI Protocol - Decentralized UI software as an NFT</title>
        <meta
          name="description"
          content="Providing an open and decentralized framework for building user interface software that is simple enough for anyone to use."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ApiKeysHeader />
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          {error?.message}
          <form onSubmit={register} className="display-flex px">
            <input
              className="flex-inline mr-2 rounded-lg"
              type="url"
              name="domain"
              placeholder="https://blocksui.xyz"
            />
            <button
              type="submit"
              className="flex-inline justify-center rounded-lg bg-neutral-800 py-2 px-3 text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors hover:bg-black active:bg-neutral-800 active:text-white/80"
            >
              Register a new domain
            </button>
          </form>
          <div className="mt-6 border-t">
            <ul>
              {keys.length === 0 && (
                <li className="group flex flex-row flex-col items-center border-b px-1 py-4 text-left text-sm md:flex-row">
                  No domains have been registerred yet
                </li>
              )}
              {keys.map((key: ApiKey, i: number) => (
                <li
                  key={key.id}
                  className="group flex flex-row flex-col items-center border-b px-1 py-4 text-left text-sm md:flex-row"
                >
                  <h3 className="mb-4 grow text-lg font-medium text-black md:mb-0">
                    {key.domain}
                  </h3>
                  {key.key === undefined ? (
                    <button
                      onClick={() => signOrigin(i)}
                      className="flex-inline justify-center rounded-lg border py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors hover:bg-black hover:text-white active:bg-neutral-800 active:text-white/80"
                    >
                      Get API Key
                    </button>
                  ) : (
                    <p className="italic text-neutral-500">{key.key}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </AuthenticatedPage>
  )
}

export default ApiKeys
