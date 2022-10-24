import Image from 'next/future/image'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

import logoCoinbase from '../../assets/coinbase-wallet-logo.svg'
import useAccount from '@/hooks/use-account'
import { Wallets } from '@/context/AccountContext'

const CoinbaseButton = () => {
  const { signIn } = useAccount()

  return (
    <button
      className="block w-full hover:bg-neutral-50"
      onClick={() => signIn(Wallets.coinbase)}
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <Image
              className="h-12 w-12 rounded-full"
              src={logoCoinbase}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 px-4 text-left md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="truncate text-sm font-medium text-neutral-600">
                Coinbase
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

export default CoinbaseButton
