import type { NextPage } from 'next'
import Head from 'next/head'

import {
  PublishForm,
  PublishHeader,
  PublishPreview,
} from '@/components/PublishPage'

const Publish: NextPage = () => {
  return (
    <>
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
        <h1 className="sr-only">Publish your Block</h1>
        <PublishPreview />
        <PublishForm />
      </main>
    </>
  )
}

export default Publish
