import { Fragment, ReactNode, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import Drawer from 'components/Drawer'
import FilterForm from 'components/FilterForm'

export interface Option {
  name: string
  href: string
  current: boolean
}

interface Props {
  children?: ReactNode
  options: Option[]
}

const SortHeader = ({ children, options }: Props) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="flex items-baseline justify-between border-b border-neutral-200 pt-24 pb-6">
      {children}
      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-neutral-700 hover:text-black">
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-neutral-500"
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {options.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a
                        href={option.href}
                        className={clsx(
                          option.current
                            ? 'font-medium text-black'
                            : 'text-neutral-500',
                          active ? 'bg-neutral-100' : '',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <button
          type="button"
          className="-m-2 ml-5 p-2 text-neutral-400 hover:text-neutral-500 sm:ml-7"
        >
          <span className="sr-only">View grid</span>
          <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-neutral-400 hover:text-neutral-500 sm:ml-6 lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <Drawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        >
          <FilterForm className="mt-4 border-t border-neutral-200" />
        </Drawer>
      </div>
    </div>
  )
}

export default SortHeader
