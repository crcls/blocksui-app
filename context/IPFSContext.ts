import { createContext } from 'react'
import { Web3Storage } from 'web3.storage'

export interface IPFSContextType {
  w3sClient: Web3Storage | null
}

export default createContext<IPFSContextType | null>(null)
