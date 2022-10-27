import { createContext } from 'react'
import { Contract, BigNumber } from 'ethers'

import type { Account } from 'context/AccountContext'
import type { BlockConfig } from '@crcls/blocksui-sdk'

export interface BlockReceipt {
  name: string
  description: string
  tags: string
  cid: string
  metadataURI: string
  coverURI: string
  tokenId: number
  txHash: string
  gasUsed: BigNumber
}

export interface PublishContextType {
  account: Account
  blockConfig: BlockConfig
  setStep: (step: number) => void
  step: number
  setBlockReceipt: (block: BlockReceipt) => void
  blockReceipt?: BlockReceipt
  contract?: Contract
  price?: string
}

export const PublishContext = createContext<PublishContextType>(null!)
