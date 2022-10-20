import { Fragment, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Contract } from 'ethers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FilterForm from '@/components/FilterForm'
import SortHeader from '@/components/SortHeader'
import AuthenticatedPage from '@/components/AuthenticatedPage'
import useWeb3 from '@/hooks/use-web3'
import useContracts from '@/hooks/use-contracts'
import useAccount from '@/hooks/use-account'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

function normalizeBlockImage(src: string): string {
  return src === '' ? '/blocksui.png' : src
}

const Collection: NextPage = () => {
  const { alchemyEnhancedApiProvider: w3fetch } = useWeb3()
  const { getContract, contractsLoaded } = useContracts()
  const { account } = useAccount()

  const [contract, setContract] = useState<Contract | undefined>()
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (account && contract && w3fetch) {
      setLoading(true)
      w3fetch
        .send('getNFTs', {
          owner: account.address,
          'contractAddresses[]': [contract.address],
        })
        .then((result) => {
          setLoading(false)
          setBlocks((result as { [key: string]: any }).ownedNfts)
        })
        .catch((e) => {
          console.error(e)
          setLoading(false)
        })
    }
  }, [account, contract, w3fetch])

  useEffect(() => {
    if (contract === undefined && contractsLoaded && account) {
      try {
        setContract(getContract('BUIBlockNFT', account.signer))
      } catch (e) {
        // TODO: handle error
        console.log(e)
      }
    }
  }, [contractsLoaded, contract, account])

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
        <SortHeader options={sortOptions}>
          <h1 className="text-4xl font-medium tracking-tight text-black">
            Collection
          </h1>
        </SortHeader>
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <FilterForm className="hidden lg:block" />
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
              {loading && <p>Loading...</p>}
              {blocks.length !== 0 && (
                <>
                  {blocks.map((block: any) => (
                    <button
                      key={block.id.tokenId}
                      className="group text-left text-sm"
                    >
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-neutral-100 group-hover:opacity-75">
                        <img
                          src={normalizeBlockImage(block.media[0].gateway)}
                          alt={block.metadata.description}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-4 font-medium text-black">
                        {block.metadata.name}
                      </h3>
                      <p className="italic text-neutral-500">
                        {block.metadata.description}
                      </p>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AuthenticatedPage>
  )
}

export default Collection
