import { FC, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../context/GlobalContext'
import ContractsContext, {
  type ContractsContextType,
} from '../context/Contracts'

const ContractsProvider: FC = ({ children }) => {
  const { apiHost } = useContext(GlobalContext)
  const [data, setData] = useState<ContractsContextType | Record<string, any>>(
    {}
  )

  useEffect(() => {
    fetch(`${apiHost}/contracts/abis`)
      .then(async (response) => {
        if (response.ok) {
          setData(await response.json())
        }
      })
      .catch((err) => console.error(err))
  }, [apiHost])

  return (
    <ContractsContext.Provider value={data}>
      {children}
    </ContractsContext.Provider>
  )
}

export default ContractsProvider
