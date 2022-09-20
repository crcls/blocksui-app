import { useCallback, useContext, useEffect, useState } from 'react'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from 'ethers'

import ContractsContext from '../context/Contracts'

interface ContractsHookValue {
  chain: string
  getContract: (name: string, signer: Signer) => Contract
  getContractABI: (name: string) => any
}

const useContracts = (): ContractsHookValue => {
  const ctx = useContext(ContractsContext)
  const [chain, setChain] = useState('')

  const getContractABI = useCallback(
    (name: string): any => {
      return ctx[name]
    },
    [ctx]
  )

  const getContract = useCallback(
    (name: string, signer: Signer): Contract => {
      const config = ctx[name]
      if (config === undefined) {
        throw new Error(`Config not found for ${name}`)
      }
      return new Contract(config.address, config.abi, signer)
    },
    [ctx]
  )

  useEffect(() => {
    setChain(ctx.network === 'mainnet' ? ctx.chain : ctx.network)
  }, [ctx])

  return {
    chain,
    getContract,
    getContractABI,
  }
}

export default useContracts
