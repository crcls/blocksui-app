import { FC, ReactNode, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../context/GlobalContext'
import ContractsContext, {
  type ContractsContextType,
} from '../context/Contracts'

// TODO: Fix this
// No matter what I tried, the useEffect was being called multiple times
// in succession which was causing multiple requests to the network. This
// needs to be avoided since each request will cost someone tokens.
// Maybe this is a Next.js dev env thing...
let fetching = false

const ContractsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { apiHost } = useContext(GlobalContext)
  const [data, setData] = useState<ContractsContextType | Record<string, any>>(
    {}
  )

  useEffect(() => {
    if (!fetching) {
      fetching = true
      fetch(`${apiHost}/contracts/abis`)
        .then(async (response) => {
          if (response.ok) {
            setData(await response.json())
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  return (
    <ContractsContext.Provider value={data}>
      {children}
    </ContractsContext.Provider>
  )
}

export default ContractsProvider
