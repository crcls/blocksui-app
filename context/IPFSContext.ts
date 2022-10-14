import { createContext } from 'react'

export interface IPFSContextType {
  client: null
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<IPFSContextType>(null!)
