import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useMoralis } from 'react-moralis'
import { useEnsName, useEnsAvatar } from 'wagmi'
import Image from 'next/future/image'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'

import Button from '@/components/Button'

const LoggedInButtonPopUp = () => {
  const { logout, user } = useMoralis()
  const { data: ensName } = useEnsName({ address: user?.attributes.ethAddress })
  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: user?.attributes.ethAddress,
  })

  return (
    <div className="flex items-center space-x-8">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <span className="px-4 text-sm font-medium text-neutral-900">
            {ensName}
          </span>
          {ensAvatar ? (
            <Image className="h-8 w-8 rounded-full" src={ensAvatar} alt="" />
          ) : (
            <Jazzicon diameter={32} seed={jsNumberForAddress(ensName || '')} />
          )}
        </Menu.Button>
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
                    className={clsx(
                      active ? 'bg-neutral-100' : '',
                      'block w-full px-4 py-2 text-left text-sm text-neutral-700'
                    )}
                  >
                    My Blocks
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-neutral-100' : '',
                      'block w-full px-4 py-2 text-left text-sm text-neutral-700'
                    )}
                    onClick={logout}
                  >
                    Disconnect
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Button>New Block</Button>
    </div>
  )
}

export default LoggedInButtonPopUp
