import useWeb3 from 'hooks/use-web3'

import MetaMaskButton from 'components/LoginModal/MetaMaskButton'
import CoinbaseButton from 'components/LoginModal/CoinbaseButton'
import WalletConnectButton from 'components/LoginModal/WalletConnectButton'

const ConnectWalletModalContent = () => {
  const { metamaskProvider, coinbaseProvider } = useWeb3()

  return (
    <>
      <h2 className="text-xl font-medium text-neutral-900 sm:pr-12">
        Connect Wallet
      </h2>
      <p>Connect with one of our available wallet providers.</p>
      <ul role="list" className="mt-4 divide-y divide-neutral-200">
        {metamaskProvider && (
          <li>
            <MetaMaskButton />
          </li>
        )}
        {coinbaseProvider && (
          <li>
            <CoinbaseButton />
          </li>
        )}
        <li>
          <WalletConnectButton />
        </li>
      </ul>
    </>
  )
}

export default ConnectWalletModalContent
