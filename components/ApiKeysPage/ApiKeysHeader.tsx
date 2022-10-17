import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const sortOptions = [
  { name: 'A-Z', href: '#', current: true },
  { name: 'Z-A', href: '#', current: false },
]

const ApiKeysHeader = () => {
  return (
    <div className="flex items-baseline justify-between border-b border-neutral-200 pt-24 pb-6">
      <div>
        <h1 className="mb-2 text-4xl font-medium tracking-tight text-black">
          API Keys
        </h1>
        <p className="text-neutral-700">
          Register a domain you&apos;d like to use the SDK with.
        </p>
      </div>
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
                {sortOptions.map((option) => (
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
      </div>
    </div>
  )
}

export default ApiKeysHeader
