import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '@/components/Header'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'

const FaqsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Decentralized UI software as an NFT – Blocks UI Protocol</title>
        <meta
          name="description"
          content="Providing an open and decentralized framework for building user interface software that is simple enough for anyone to use."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Faqs />
      <Footer />
    </>
  )
}

export default FaqsPage
