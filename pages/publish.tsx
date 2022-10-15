import { FC, Fragment, useContext, useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

// TODO: fix import path
import { BlockContainer, blockProp } from '@crcls/blocksui-sdk/dist/index.js'

import Logo from '@/components/Logo'

import { GlobalContext } from '@/context/GlobalContext'
import LoggedInButtonPopUp from '@/components/LoggedInButtonPopUp'

const blockConfig = [
  {
    children: [
      {
        id: 'moonMailConnector',
        type: 'MoonmailConnector',
        props: {
          accountId: blockProp('2a397d1e-86db-4eb9-8191-78ae896744ab'),
        },
        connections: [
          {
            action: 'success',
            hooks: {
              fadeTransitionSuccess: ['show'],
              fadeTransitionInProgress: ['hide'],
              fadeTransitionError: ['hide'],
            },
          },
          {
            action: 'error',
            hooks: {
              fadeTransitionSuccess: ['hide'],
              fadeTransitionInProgress: ['hide'],
              fadeTransitionError: ['show'],
            },
          },
          {
            action: 'inProgress',
            hooks: {
              fadeTransitionSuccess: ['hide'],
              fadeTransitionInProgress: ['show'],
              fadeTransitionError: ['hide'],
            },
          },
        ],
      },
      {
        children: ['MoonMail Contact Form'],
        className: 'text-lg font-medium text-neutral-900',
        props: {
          level: blockProp(2),
        },
        type: 'Heading',
      },
      {
        connections: [
          { action: 'submit', hooks: { moonMailConnector: ['post'] } },
        ],
        children: [
          {
            id: 'input',
            props: {
              name: blockProp('Address'),
              placeholder: blockProp('dobby@hogwarts.com'),
              type: blockProp('email'),
              label: blockProp('Email'),
            },
            state: {
              value: '',
            },
            type: 'Input',
          },
          {
            children: ['Submit'],
            className:
              'w-full rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50 sm:order-last sm:mt-3 sm:w-auto',
            connections: [
              {
                action: 'click',
                hooks: { logger: ['log'] },
              },
            ],
            id: 'button',
            props: {
              type: blockProp('submit'),
            },
            type: 'Button',
          },
        ],
        type: 'Form',
      },
      {
        id: 'fadeTransitionSuccess',
        type: 'FadeTransition',
        props: {
          time: blockProp('300ms'),
        },
        children: ['Success'],
      },
      {
        id: 'fadeTransitionInProgress',
        type: 'FadeTransition',
        children: ['Loading ...'],
        className: 'bui-fade-in-loading',
        props: {
          time: blockProp('300ms'),
        },
      },
      {
        id: 'fadeTransitionError',
        type: 'FadeTransition',
        children: ['Error!'],
        className: 'bui-fade-in',
        props: {
          time: blockProp('300ms'),
        },
      },
    ],
    type: 'Container',
  },
]

interface PubCostProps {
  address: string
  abi: any
}

const PublishCost: FC<PubCostProps> = ({ address, abi }) => {
  const [price] = useState<string | undefined>()

  return (
    <dd className="text-base">
      {price ? `${price} MATIC` : <span>Loading</span>}
    </dd>
  )
}

const Publish: NextPage = () => {
  const globalCtx = useContext(GlobalContext)
  const [error] = useState<Error | undefined>()
  const [isBrowser, setIsBrowser] = useState(false)
  const [address] = useState<string | undefined>()
  const [abi] = useState<string | undefined>()

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined')
  }, [])

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
      <div
        className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 hidden h-full w-1/2 bg-neutral-50 lg:block"
        aria-hidden="true"
      />
      <header className="relative border-b border-neutral-200 bg-white text-sm font-medium text-neutral-700">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <Link href="/" className="absolute left-0 top-1/2 -mt-4">
              <span className="sr-only">Blocks UI Protocol</span>
              <Logo className="h-8 w-auto" />
            </Link>
            <div className="absolute right-0 -mt-2">
              <LoggedInButtonPopUp />
            </div>
            <p className="sm:hidden">Step 2 of 4</p>
          </div>
        </div>
      </header>
      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>
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
                {address && <PublishCost address={address} abi={abi} />}
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
        <form className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="metadata-heading">
              <h2
                id="metadata-heading"
                className="text-lg font-medium text-neutral-900"
              >
                Metadata
              </h2>
              <p className="mt-6 text-sm font-medium text-neutral-700">
                {error === undefined ? '' : error.message}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="blockName"
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="cover-image"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Cover image
                  </label>
                  <div className="mt-1">
                    <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-neutral-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-neutral-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Tags
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="mt-10 border-t border-neutral-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                Mint
              </button>
              <p className="mt-4 text-center text-sm text-neutral-500 sm:mt-0 sm:text-left"></p>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default Publish
