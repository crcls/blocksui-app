import { useMoralis } from 'react-moralis'

const DisconnectWalletModalContent = () => {
  const { logout } = useMoralis()

  return (
    <>
      <h2 className="text-xl font-medium text-gray-900 sm:pr-12">
        Disconnect wallet
      </h2>
      <p>Connect with one of our available wallet providers.</p>
      <ul>
        <li>
          <button onClick={logout} className="bg-blue-700">
            Disconnect
          </button>
        </li>
      </ul>
    </>
  )
}

export default DisconnectWalletModalContent
