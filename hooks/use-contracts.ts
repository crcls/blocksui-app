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
      if (ctx === null) {
        throw new Error(`Contract configs not loaded.`)
      }

      const abi = ctx[name]
      if (abi === undefined) {
        throw new Error(`Contract abi for ${name} not found`)
      }

      return abi
    },
    [ctx]
  )

  const getContract = useCallback(
    (name: string, signer: Signer): Contract => {
      if (ctx === null) {
        throw new Error(`Contract configs not loaded.`)
      }

      const config = ctx[name]
      if (config === undefined) {
        throw new Error(`Config not found for ${name}`)
      }
      return new Contract(config.address, config.abi, signer)
    },
    [ctx]
  )

  useEffect(() => {
    const newChain = ctx
      ? ctx.network === 'mainnet'
        ? ctx.chain
        : ctx.network
      : 'ethereum'
    if (chain !== newChain) {
      setChain(newChain)
    }
  }, [chain, ctx])

  return {
    chain,
    getContract,
    getContractABI,
  }
}

export default useContracts
