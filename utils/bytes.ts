import mh from 'multihashes'
import { toString, fromString } from 'uint8arrays'

export function cidToBytes32(cid: string): string {
  const bytes = mh.fromB58String(cid)
  const hex = mh.toHexString(bytes.slice(2))

  return `0x${hex}`
}

export function bytes32ToCid(bytes32: string): string {
  const hex = '1220' + bytes32.substring(2)
  const bytes = mh.fromHexString(hex)
  return mh.toB58String(bytes)
}

export function strToUint8(data: string): Uint8Array {
  return fromString(data)
}

export function uint8ToStr(data: Uint8Array, enc: any): string {
  return toString(data, enc)
}

export async function readFile(file: File): Promise<ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader()
    // Register event listeners
    reader.addEventListener('loadend', (e) => {
      if (e.target?.result) {
        resolve(e.target.result as ArrayBuffer)
      } else {
        reject(new Error('file was empty'))
      }
    })
    reader.addEventListener('error', reject)
    // Read file
    reader.readAsArrayBuffer(file)
  })
}
