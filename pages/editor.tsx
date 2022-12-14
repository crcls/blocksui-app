import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

import DragItemWithDropZone from 'components/editor/DragItemWithDropZone'
import { PrimitiveTypes } from 'components/editor/types'
import DragItem from 'components/editor/DragItem'
import Logo from 'components/Logo'
import NavLinks from 'components/NavLinks'
import LoggedInButtonPopUp from 'components/LoggedInButtonPopUp'
import Button from 'components/Button'
import SidebarNavigation from 'components/SidebarNavigation'
import DropZone from 'components/editor/DropZone'

const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {
    name: 'Marketplace',
    href: '/marketplace',
    children: [],
  },
  { name: 'Editor', href: '/editor', children: [] },
  { name: 'FAQs', href: '/faqs', children: [] },
]
const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Collection', href: '/collection' },
  { name: 'Disconnect', href: '#' },
]
const elements = [
  {
    id: 1,
    name: 'PrimitiveButton',
    preview: <DragItem type={PrimitiveTypes.PRIMITIVE_BUTTON} />,
  },
  {
    id: 2,
    name: 'PrimitiveContainer',
    preview: (
      <DragItemWithDropZone
        showButtons={false}
        type={PrimitiveTypes.PRIMITIVE_CONTAINER}
      />
    ),
  },
  {
    id: 3,
    name: 'PrimitiveForm',
    preview: (
      <DragItemWithDropZone
        showButtons={false}
        type={PrimitiveTypes.PRIMITIVE_FORM}
      />
    ),
  },
  {
    id: 4,
    name: 'PrimitiveHeading',
    preview: <DragItem type={PrimitiveTypes.PRIMITIVE_HEADING} />,
  },
  {
    id: 5,
    name: 'PrimitiveInput',
    preview: <DragItem type={PrimitiveTypes.PRIMITIVE_INPUT} />,
  },
  {
    id: 6,
    name: 'PrimitiveMoonMailConnector',
    preview: (
      <DragItemWithDropZone
        showButtons={false}
        type={PrimitiveTypes.PRIMITIVE_MOONMAIL_CONNECTOR}
      />
    ),
  },
  {
    id: 7,
    name: 'PrimitiveParagraph',
    preview: <DragItem type={PrimitiveTypes.PRIMITIVE_PARAGRAPH} />,
  },
  {
    id: 8,
    name: 'PrimitiveTransition',
    preview: (
      <DragItemWithDropZone
        showButtons={false}
        type={PrimitiveTypes.PRIMITIVE_TRANSITION}
      />
    ),
  },
]
const block = {
  name: 'MoonMail Contact Form',
  description:
    'A simple MoonMail contact form block with some validation that you can embed in your website',
  status: 'Draft',
}

const Editor: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [isBannerOpen, setIsBannerOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    document.documentElement.classList.add('h-full', 'bg-neutral-100')
    document.body.classList.add('h-full', 'overflow-hidden')
    document.querySelector('#__next')?.classList.add('h-screen')

    return () => {
      document.documentElement.classList.remove('h-full', 'bg-neutral-100')
      document.body.classList.remove('h-full', 'overflow-hidden')
      document.querySelector('#__next')?.classList.remove('h-screen')
    }
  }, [])

  return (
    <>
      <div className="flex h-full flex-col">
        {isBannerOpen && (
          <div className="relative bg-black">
            <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
              <div className="pr-16 sm:px-16 sm:text-center">
                <p className="font-medium text-white">
                  <span className="hidden md:inline">
                    Please note that the editor is missing features and is
                    currently only for demo purposes. The demo block on the
                    publish page has been hard-coded.
                  </span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <Link
                      href="/publish"
                      className="font-bold text-white underline"
                    >
                      Publish demo block
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </span>
                </p>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
                <button
                  type="button"
                  className="flex rounded-md p-2 hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setIsBannerOpen(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        <header className="relative flex h-16 flex-shrink-0 items-center bg-white">
          <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
            <Link
              href="/"
              className="flex h-16 w-16 items-center justify-center bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-600 lg:w-24"
            >
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="mx-auto lg:hidden">
            <div className="relative">
              <label htmlFor="primitives-select" className="sr-only">
                Choose primitives
              </label>
              <select
                id="primitives-select"
                className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-black focus:ring-2 focus:ring-neutral-600"
              >
                <option value="">Connectors</option>
                <option value="">Elements</option>
                <option value="">Transitions</option>
                <option value="">Settings</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-neutral-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 lg:hidden">
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-600"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="relative max-w-2xl text-neutral-400 focus-within:text-neutral-500">
                <label htmlFor="desktop-search" className="sr-only">
                  Search all primitives
                </label>
                <input
                  id="desktop-search"
                  type="text"
                  placeholder="Search all primitives"
                  className="block w-full border-transparent pl-12 placeholder-neutral-500 focus:border-transparent focus:ring-0 sm:text-sm"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
              <nav aria-label="Global" className="flex space-x-10">
                <NavLinks />
              </nav>
              <LoggedInButtonPopUp />
            </div>
          </div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-neutral-600 sm:bg-opacity-75" />
              </Transition.Child>
              <div className="fixed inset-0 z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                  enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                  enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                  leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                >
                  <Dialog.Panel
                    className="fixed inset-0 z-40 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm sm:shadow-lg"
                    aria-label="Global"
                  >
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                      <Link href="/">
                        <Logo className="block h-8 w-auto" />
                      </Link>
                      <button
                        type="button"
                        className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-600"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="max-w-8xl mx-auto mt-2 px-4 sm:px-6">
                      <div className="relative text-neutral-400 focus-within:text-neutral-500">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search all primitives
                        </label>
                        <input
                          id="mobile-search"
                          type="text"
                          placeholder="Search all primitives"
                          className="block w-full rounded-md border-neutral-300 pl-10 placeholder-neutral-500 focus:border-neutral-600 focus:ring-neutral-600"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                      {navigation.map((item) => (
                        <Fragment key={item.name}>
                          <Link
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-black hover:bg-neutral-100"
                          >
                            {item.name}
                          </Link>
                          {item.children.map((child: any) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-neutral-500 hover:bg-neutral-100"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                    <div className="border-t border-neutral-200 pt-4 pb-3">
                      <div className="max-w-8xl mx-auto flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-neutral-800">
                            {user.name}
                          </div>
                          <div className="truncate text-sm font-medium text-neutral-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="max-w-8xl mx-auto mt-3 space-y-1 px-2 sm:px-4">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-black hover:bg-neutral-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </header>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <nav
            aria-label="Sidebar"
            className="hidden lg:block lg:w-24 lg:flex-shrink-0 lg:overflow-y-auto lg:bg-black"
          >
            <div className="mt-6 w-full flex-1 space-y-1 px-2">
              <SidebarNavigation />
            </div>
          </nav>
          <main className="min-w-0 flex-1 border-t border-neutral-200 xl:flex">
            <section
              aria-labelledby="block-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
            >
              <div className="flex-shrink-0 border-b border-neutral-200 bg-white">
                <div className="flex h-16 flex-col justify-center">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between py-3">
                      <div>
                        <div className="isolate inline-flex rounded-md shadow-sm sm:space-x-3 sm:shadow-none">
                          <span className="inline-flex sm:shadow-sm">
                            <button
                              type="button"
                              className="relative inline-flex items-center rounded-l-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50 focus:z-10 focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                              onClick={() => router.push('/collection')}
                            >
                              <ArrowUturnLeftIcon
                                className="mr-2.5 h-5 w-5 text-neutral-400"
                                aria-hidden="true"
                              />
                              <span>Back</span>
                            </button>
                          </span>
                        </div>
                      </div>
                      <Button className="bg-green-500" href="/publish">
                        Publish Block
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="bg-white pt-5 pb-6 shadow">
                  <div className="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
                    <div className="sm:w-0 sm:flex-1">
                      <h1
                        id="block-heading"
                        className="text-lg font-medium text-black"
                      >
                        {block.name}
                      </h1>
                      <p className="mt-1 truncate text-sm text-neutral-500">
                        {block.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-0.5 text-sm font-medium text-neutral-800">
                        {block.status}
                      </span>
                      <Menu
                        as="div"
                        className="relative ml-3 inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="-my-2 flex items-center rounded-full bg-white p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    className={clsx(
                                      active
                                        ? 'bg-neutral-100 text-black'
                                        : 'text-neutral-700',
                                      'flex w-full justify-between px-4 py-2 text-sm'
                                    )}
                                  >
                                    <span>Delete</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
                <DropZone />
              </div>
            </section>
            <aside className="hidden xl:order-first xl:block xl:flex-shrink-0">
              <div className="relative flex h-full w-96 flex-col border-r border-neutral-200 bg-neutral-100">
                <div className="flex-shrink-0">
                  <div className="flex h-16 flex-col justify-center bg-white px-6">
                    <div className="flex items-baseline space-x-3">
                      <h2 className="text-lg font-medium text-black">
                        Elements
                      </h2>
                      <p className="text-sm font-medium text-neutral-500">
                        {elements.length} elements
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-b border-neutral-200 bg-neutral-50 px-6 py-2 text-sm font-medium text-neutral-500">
                    Sorted by name
                  </div>
                </div>
                <nav
                  aria-label="Block"
                  className="min-h-0 flex-1 overflow-y-auto"
                >
                  <ul
                    role="list"
                    className="divide-y divide-neutral-200 border-b border-neutral-200"
                  >
                    {elements.map((element) => (
                      <li
                        key={element.id}
                        className="relative bg-white py-5 px-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-600 hover:bg-neutral-50"
                      >
                        <div className="flex justify-between space-x-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-black">
                              {element.name}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1">{element.preview}</div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  )
}

export default Editor
