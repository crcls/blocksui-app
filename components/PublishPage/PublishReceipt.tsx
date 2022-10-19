import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Link from 'next/link'

import { PublishContext } from '@/context/PublishContext'

const PublishReceipt = () => {
  const { blockReceipt, price } = useContext(PublishContext)
  const [gas, setGas] = useState('0')
  const [total, setTotal] = useState('0')

  useEffect(() => {
    if (blockReceipt) {
      const gas = ethers.utils.formatEther(blockReceipt.gasUsed)
      setGas(gas)

      const tokenCost = ethers.utils.parseEther(price!)
      const sum = tokenCost.add(blockReceipt.gasUsed)
      setTotal(ethers.utils.formatEther(sum))
    }
  }, [blockReceipt, price])

  return (
    <section
      aria-labelledby="receipt-heading"
      className="bg-neutral-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <h2
          id="summary-heading"
          className="text-lg font-medium text-neutral-900"
        >
          Transaction Receipt
        </h2>
        <div className="grid max-w-7xl grid-cols-1 grid-cols-1 gap-x-2 lg:grid-cols-2 lg:px-8 xl:gap-x-4">
          <div className="col-start-1 max-w-full py-6 lg:row-start-1">
            <img
              alt={blockReceipt!.name}
              src={blockReceipt!.coverURI}
              className="h-auto max-w-full rounded-lg"
            />
          </div>
          <div className="col-start-2 row-start-2 w-80 max-w-full py-6 lg:row-start-1">
            <h2 className="text-lg font-medium text-neutral-900 md:text-xl lg:text-2xl">
              {blockReceipt!.name}
            </h2>
            <p className="mt-2 mb-2 text-xs font-medium text-neutral-700">
              {blockReceipt!.description}
            </p>
            <p className="mt-2 mb-4 text-xs font-medium text-neutral-700">
              Tags: {blockReceipt!.tags}
            </p>
            <div>
              <p>Cost: {price} MATIC</p>
              <p>Gas: {gas} MATIC</p>
              <p className="mt-2 border-t pt-4 text-sm font-bold">
                Total: {total} MATIC
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/collection"
          className="block w-full rounded-md border border-transparent bg-green-600 py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50 sm:order-last sm:mt-3"
        >
          Done
        </Link>
      </div>
    </section>
  )
}

export default PublishReceipt
