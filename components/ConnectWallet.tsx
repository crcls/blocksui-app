import { FC, useContext } from 'react'
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import EthAccount from './EthAccount'
import Link from 'next/link'
import FormatEth from '@/components/FormatEth'
import ConnectWalletModal from '@/components/ConnectWalletModal'
import { GlobalContext } from 'context/GlobalContext'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ConnectWallet: FC = () => {
  const account = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const wallet = connectors[0]
  const { dispatch } = useContext(GlobalContext)

  if (account.isConnecting) return null

  if (!account.isConnected) return <ConnectWalletModal />

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-100">
          <EthAccount
            address={account.address}
            ens={{
              avatar: ensAvatar,
              name: ensName,
            }}
          />
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Balance</p>
            <p className="truncate text-sm font-medium text-black">
              {account.address && <Balance address={account.address} />}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/address/${account.address}`}
                  className={classNames(
                    active ? 'bg-neutral-100 text-black' : 'text-neutral-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Portfolio
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-neutral-100 text-black' : 'text-neutral-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => {
                      dispatch({ type: 'CONNECT_WALLET', payload: false })
                      disconnect()
                    }}
                  >
                    Disconnect
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ConnectWallet

type Props = {
  address: string
}

export const Balance: FC<Props> = ({ address }) => {
  const { data: balance } = useBalance({ addressOrName: address })
  return <FormatEth amount={balance?.value} />
}
