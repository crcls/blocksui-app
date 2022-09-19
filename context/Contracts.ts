import { createContext } from 'react'

export interface ContractsContext {
  chain: string
  network: string
  [key: string]: any
}

// @ts-expect-error
export default createContext<ContractsContext | null>(null)
