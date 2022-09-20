import { createContext } from 'react'

export interface ContractsContextType {
  chain: string
  network: string
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<ContractsContextType | Record<string, any>>(null!)
