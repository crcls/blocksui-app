import { useCallback } from 'react'
import LitJsSdk from '@lit-protocol/sdk-browser'

import useContracts from './use-contracts'
import { resolver } from '../utils/async'

export interface AuthSig {
  sig: string
  derivedVia: string
  signedMessage: string
  address: string
}

export interface LitHookValue {
  createAuthCondition: (
    contractName: string,
    functionName: string,
    functionParams: string[]
  ) => { [key: string]: any }
  encryptFile: (data: Uint8Array) => Promise<{
    encryptedFile: Blob
    symmetricKey: Uint8Array
  }>
  getAuthSig: () => Promise<AuthSig>
  saveEncryption: (
    symmetricKey: Uint8Array,
    evmContractConditions: Array<{ [key: string]: any }>
  ) => Promise<Uint8Array>
}

const client = new LitJsSdk.LitNodeClient()

const useLit = (): LitHookValue => {
  const { chain, getContractABI } = useContracts()

  const encryptFile = async (
    data: Uint8Array
  ): Promise<{ encryptedFile: Blob; symmetricKey: Uint8Array }> => {
    return LitJsSdk.encryptFile({ file: new Blob([data]) })
  }

  const getAuthSig = useCallback(async (): Promise<AuthSig> => {
    console.log(chain)
    return LitJsSdk.checkAndSignAuthMessage({ chain })
  }, [chain])

  const saveEncryption = useCallback(
    async (
      symmetricKey: Uint8Array,
      evmContractConditions: Array<{ [key: string]: any }>
    ): Promise<Uint8Array> => {
      if (chain) {
        await client.connect()

        const authSig = await getAuthSig()
        const [err, encryptedSymmetricKey] = await resolver(
          client.saveEncryptionKey({
            authSig,
            chain,
            evmContractConditions,
            symmetricKey,
          })
        )

        if (err !== undefined || encryptedSymmetricKey === undefined) {
          const message = err ? err.message : 'Failed to enrcypt the key'
          console.log('saveEncryptionKey', message)
        }

        return encryptedSymmetricKey as Uint8Array
      }

      throw new Error('Chain not loaded')
    },
    [chain, getAuthSig]
  )

  const createAuthCondition = useCallback(
    (
      contractName: string,
      functionName: string,
      functionParams: string[]
    ): { [key: string]: any } => {
      const config = getContractABI(contractName)
      if (config === undefined) {
        throw new Error(`ABI not found for ${contractName}`)
      }

      const functionAbi = config.abi.filter(
        (abi: { name: string }) => abi.name === functionName
      )

      if (functionAbi.length === 0) {
        throw new Error('Function not found in the contract ABI')
      }

      return {
        chain,
        contractAddress: config.address,
        functionName,
        functionParams,
        functionAbi: functionAbi[0],
        returnValueTest: {
          comparator: '=',
          value: true,
        },
      }
    },
    [chain, getContractABI]
  )

  return {
    createAuthCondition,
    encryptFile,
    getAuthSig,
    saveEncryption,
  }
}

export default useLit
