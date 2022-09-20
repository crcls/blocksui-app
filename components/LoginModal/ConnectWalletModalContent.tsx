import { useMoralis } from 'react-moralis'
import MetamaskButton from './MetamaskButton'

const ConnectWalletModalContent = () => {
  const { logout } = useMoralis()

  return (
    <>
      <h2 className="text-xl font-medium text-gray-900 sm:pr-12">
        Connect wallet
      </h2>
      <p>Connect with one of our available wallet providers.</p>
      <ul>
        <li>
          <MetamaskButton />
        </li>
        <li>
          <button onClick={logout}>disconnect</button>
        </li>
      </ul>
    </>
  )
}

export default ConnectWalletModalContent
