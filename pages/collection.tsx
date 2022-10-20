import { Fragment, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FilterForm from '@/components/FilterForm'
import SortHeader from '@/components/SortHeader'
import AuthenticatedPage from '@/components/AuthenticatedPage'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const Collection: NextPage = () => {
  const [blocks] = useState([])

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
              {blocks.length !== 0 && (
                <>
                  {blocks.map((block: any) => (
                    <button
                      key={block.token_id}
                      className="group text-left text-sm"
                    >
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-neutral-100 group-hover:opacity-75">
                        <img
                          src={`https://ipfs.io/ipfs${block.metadata.image.slice(
                            6
                          )}`}
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
                      {/* <p className="mt-2 font-medium text-black">0.33 ETH</p> */}
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
