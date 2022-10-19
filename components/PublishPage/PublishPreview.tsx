import { Fragment, useContext, useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'

// TODO: fix import path
import { BlockContainer } from '@crcls/blocksui-sdk/dist/index.js'

import { GlobalContext } from '@/context/GlobalContext'
import { PublishContext } from '@/context/PublishContext'

const PublishPreview = () => {
  const globalCtx = useContext(GlobalContext)
  const { blockConfig, price } = useContext(PublishContext)

  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined')
  }, [])

  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-neutral-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <h2
          id="summary-heading"
          className="text-lg font-medium text-neutral-900"
        >
          Block Preview
        </h2>
        {isBrowser && (
          <div className="py-6">
            <BlockContainer config={blockConfig} host={globalCtx.apiHost} />
          </div>
        )}
        <dl className="hidden space-y-6 border-t border-neutral-200 pt-6 text-sm font-medium text-neutral-900 lg:block">
          <div className="flex items-center justify-between">
            <dt className="text-base">Price</dt>
            <dd className="text-base">
              {price ? `${price} MATIC` : <span>Loading...</span>}
            </dd>
          </div>
        </dl>
        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-neutral-900 lg:hidden">
          <div className="relative z-10 border-t border-neutral-200 bg-white px-4 sm:px-6">
            <div className="mx-auto max-w-lg">
              <Popover.Button className="flex w-full items-center py-6 font-medium">
                <span className="mr-auto text-base">Total</span>
                <span className="mr-2 text-base">$361.80</span>
                <ChevronUpIcon
                  className="h-5 w-5 text-neutral-500"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>
          <Transition.Root as={Fragment}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                  <dl className="mx-auto max-w-lg space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-600">Subtotal</dt>
                      <dd>$320.00</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-600">Shipping</dt>
                      <dd>$15.00</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-600">Taxes</dt>
                      <dd>$26.80</dd>
                    </div>
                  </dl>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </Popover>
      </div>
    </section>
  )
}

export default PublishPreview
