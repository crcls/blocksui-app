import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { BigNumber, ethers, Contract } from 'ethers'

import type { BlockConfig } from '@crcls/blocksui-sdk'

import useContracts from 'hooks/use-contracts'
import useAccount from 'hooks/use-account'
import { PublishContext, BlockReceipt } from 'context/PublishContext'

import {
  PublishForm,
  PublishHeader,
  PublishPreview,
  PublishReceipt,
} from 'components/PublishPage'

import blockConfig from 'assets/demo-block-config.json'

const Publish: NextPage = () => {
  const { account } = useAccount()
  const { getContract, contractsLoaded } = useContracts()
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<number>(0)
  const [blockReceipt, setBlockReceipt] = useState<BlockReceipt | undefined>()

  const [contract, setContract] = useState<Contract | undefined>()
  const [price, setPrice] = useState<string | undefined>()

  useEffect(() => {
    if (account && contractsLoaded) {
      try {
        const cnt = getContract('BUIBlockNFT', account.signer)
        setContract(cnt)
      } catch (e: any) {
        console.error(e)
        let msg = 'Failed to load contract'
        if (e instanceof Error) {
          msg = e.message
        }

        setError(msg)
      }
    }
  }, [account, contractsLoaded, getContract])

  useEffect(() => {
    if (contract) {
      setError(null)

      contract
        .publishPrice()
        .catch((e: any) => {
          console.error(e)
          setPrice('N/A')
          setError('Failed to fetch price')
        })
        .then((price: BigNumber) => {
          if (price) {
            setPrice(ethers.utils.formatEther(price))
          }
        })
    }
  }, [contract])

  if (contract === undefined) {
    return <p>Loading contract...</p>
  }

  return (
    <PublishContext.Provider
      value={{
        account,
        blockConfig: blockConfig as unknown as BlockConfig,
        blockReceipt,
        setBlockReceipt,
        contract,
        price,
        setStep,
        step,
      }}
    >
      <Head>
        <title>Blocks UI Protocol - Decentralized UI software as an NFT</title>
        <meta
          name="description"
          content="Providing an open and decentralized framework for building user interface software that is simple enough for anyone to use."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PublishHeader />
      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        {error && <p>{error}</p>}
        <h1 className="sr-only">Publish your Block</h1>
        <PublishPreview />
        {step < 2 ? <PublishForm /> : <PublishReceipt />}
      </main>
    </PublishContext.Provider>
  )
}

export default Publish
