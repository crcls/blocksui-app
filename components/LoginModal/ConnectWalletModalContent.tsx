import MetaMaskButton from '@/components/LoginModal/MetaMaskButton'

const ConnectWalletModalContent = () => {
  return (
    <>
      <h2 className="text-xl font-medium text-neutral-900 sm:pr-12">
        Connect Wallet
      </h2>
      <p>Connect with one of our available wallet providers.</p>
      <ul role="list" className="mt-4 divide-y divide-neutral-200">
        <li>
          <MetaMaskButton />
        </li>
      </ul>
    </>
  )
}

export default ConnectWalletModalContent
