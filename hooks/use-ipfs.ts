import { useCallback, useContext } from 'react'

import { GlobalContext } from '../context/GlobalContext'
// import IPFSContext from '../context/IPFSContext'
import { resolver } from '../utils/async'

export interface IPFSHookValue {
  addIPFS: (name: string, file: Uint8Array) => Promise<string>
}

const useIPFS = (): IPFSHookValue => {
  const { apiHost } = useContext(GlobalContext)

  const addIPFS = useCallback(
    async (name: string, file: Uint8Array): Promise<string> => {
      const formData = new FormData()
      formData.append(name, new Blob([file]), `${name}.block`)

      const req = new Request(`${apiHost}/blocks/compile`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
      })
      const [err, resp] = await resolver(fetch(req))

      if (err !== undefined || !resp?.ok || resp === undefined) {
        throw new Error(err ? err.message : 'IPFS Upload response empty.')
      }

      const cid = await resp.text()

      return cid
    },
    [apiHost]
  )

  return {
    addIPFS,
  }
}

export default useIPFS
