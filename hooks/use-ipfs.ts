import { useCallback, useContext } from 'react'
import { Web3File } from 'web3.storage'

import { GlobalContext } from '../context/GlobalContext'
import IPFSContext from '../context/IPFSContext'
import { resolver } from '../utils/async'

export interface IPFSHookValue {
  addIPFS: (name: string, file: Uint8Array) => Promise<string>
  addWeb3Storage: (files: File[]) => Promise<string>
  getWeb3Storage: (cid: string) => Promise<any>
}

const useIPFS = (): IPFSHookValue => {
  const { apiHost } = useContext(GlobalContext)
  const { w3sClient } = useContext(IPFSContext)

  const getWeb3Storage = useCallback(
    async (cid: string): Web3File[] => {
      const [err, res] = await resolver(w3sClient.get(cid))
      if (err !== undefined || !res.ok) {
        throw new Error(error ? err.message : 'Response not OK.')
      }

      const files = await res.files()
      return files
    },
    [w3sClient]
  )

  const addWeb3Storage = useCallback(
    async (files: File[]): Promise<string> => {
      return w3sClient.put(files)
    },
    [w3sClient]
  )

  const addIPFS = useCallback(
    async (name: string, file: Uint8Array): string => {
      const formData = new FormData()
      formData.append(name, new Blob([file]), `${name}.block`)

      const req = new Request(`${apiHost}/blocks/compile`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
      })
      const [err, resp] = await resolver(fetch(req))

      if (err !== undefined || !resp.ok || resp === undefined) {
        throw new Error(error ? err.message : 'IPFS Upload response empty.')
      }

      const cid = await resp.text()

      return cid
    },
    [apiHost]
  )

  return {
    addIPFS,
    addWeb3Storage,
    getWeb3Storage,
  }
}

export default useIPFS
