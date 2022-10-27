import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import Image from 'next/future/image'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

import Button from 'components/Button'
import LoginModal from 'components/LoginModal/LoginModal'
import useAccount from 'hooks/use-account'

const LoggedInButtonPopUp = () => {
  const router = useRouter()
  const { account, signOut } = useAccount()

  const [error, setError] = useState<Error | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)
  const [accountName, setAccountName] = useState<string | null>(null)
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null)

  useEffect(() => {
    if (account) {
      setModalOpened(false)
      account
        .name()
        .then(async (name: string) => {
          setAccountName(name)

          const avatar = await account.ensAvatar()
          setEnsAvatar(avatar)
        })
        .catch(console.error)
    } else {
      setAccountName(null)
      setEnsAvatar(null)
    }
  }, [account, setModalOpened])

  return (
    <>
      {account ? (
        <div className="flex items-center space-x-8">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              <span className="px-4 text-sm font-medium text-neutral-900">
                {accountName}
              </span>
              {ensAvatar ? (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={ensAvatar}
                  alt=""
                />
              ) : (
                <Jazzicon
                  diameter={32}
                  seed={jsNumberForAddress(account.address!)}
                />
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
                        onClick={async () => await router.push('/collection')}
                      >
                        Collection
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
                        onClick={async () => await router.push('/apikeys')}
                      >
                        API Keys
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
                        onClick={signOut}
                      >
                        Disconnect
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Button href="/editor">New Block</Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            setModalOpened(true)
          }}
        >
          Connect Wallet
        </Button>
      )}
      {modalOpened && (
        <LoginModal
          handleClose={() => setModalOpened(false)}
          open={modalOpened}
        />
      )}
      {!dismissed && error && (
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={error ? true : false}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-neutral-900">
                        Error
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {error.message}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                        onClick={() => {
                          setDismissed(true)
                          setError(null)
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </>
  )
}

export default LoggedInButtonPopUp
