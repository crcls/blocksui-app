import { createContext } from 'react'
import { Web3Storage } from 'web3.storage'

export interface IPFSContextType {
  w3sClient: Web3Storage | null
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<IPFSContextType>(null!)
