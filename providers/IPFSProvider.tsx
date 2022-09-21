import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'

import { GlobalContext } from '../context/GlobalContext'
import IPFSContext from '../context/IPFSContext'

const IPFSProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { web3Token } = useContext(GlobalContext)
  const [client, setClient] = useState<Web3Storage | null>(null)

  useEffect(() => {
    if (web3Token && client === null) {
      setClient(new Web3Storage({ token: web3Token }))
    }
  }, [web3Token, client])

  return (
    <IPFSContext.Provider
      value={{
        w3sClient: client,
      }}
    >
      {children}
    </IPFSContext.Provider>
  )
}

export default IPFSProvider
