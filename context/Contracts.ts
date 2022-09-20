import { createContext } from 'react'

export interface ContractsContextType {
  chain: string
  network: string
  [key: string]: any
}

export default createContext<ContractsContextType | null>(null)
