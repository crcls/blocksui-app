import { ChevronRightIcon } from '@heroicons/react/20/solid'

import MetaMask from 'components/Svg/MetaMask'
import useAccount from 'hooks/use-account'
import { Wallets } from 'context/AccountContext'

const MetaMaskButton = () => {
  const { signIn } = useAccount()

  return (
    <button
      className="block w-full hover:bg-neutral-50"
      onClick={() => signIn(Wallets.metamask)}
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <MetaMask className="h-12 w-12 rounded-full" />
          </div>
          <div className="min-w-0 flex-1 px-4 text-left md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="truncate text-sm font-medium text-neutral-600">
                MetaMask
              </p>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-neutral-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  )
}

export default MetaMaskButton
