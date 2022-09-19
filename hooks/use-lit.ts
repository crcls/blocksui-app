import LitJsSdk from '@lit-protocol/sdk-browser'

// const client = new LitJsSdk.LitNodeClient()

// const accessControlConditions = [
//   {
//     chain: 'mumbai',
//     contractAddress: '',
//     functionName: 'ownerOfBlock',
//     functionParams: [':userAddress'],
//     returnValueTest: {
//       key: '',
//       comparator: '=',
//       value: true,
//     },
//   },
//   // TODO: Add License NFT condition
// ]

const useLit = () => {
  const encryptFile = async (data: Uint8Array): [Blob, Uint8Array] => {
    return LitJsSdk.encryptFile({ file: new Blob([data]) })
  }

  const getAuthSig = async (chain: string) => {
    return LitJsSdk.checkAndSignAuthMessage({ chain })
  }

  const saveEncryption = async (encryptedKey: Uint8Array) => {}

  return {
    encryptFile,
    getAuthSig,
    saveEncryption,
  }
}

export default useLit
