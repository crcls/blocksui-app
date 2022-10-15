import { FC, ReactNode, useState } from 'react'

import IPFSContext from '../context/IPFSContext'

const IPFSProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [client] = useState<null>(null)

  return (
    <IPFSContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </IPFSContext.Provider>
  )
}

export default IPFSProvider
