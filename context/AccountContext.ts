import { createContext } from 'react'
import { IEthereumProvider, RequestArguments } from 'eip1193-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Deferrable, defineReadOnly } from '@ethersproject/properties'
import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers'

export enum Wallets {
  metamask = 'metamask',
  coinbase = 'coinbase',
  walletconnect = 'walletconnect',
}

export interface EthProvider extends IEthereumProvider {
  removeAllListeners?: () => void
  request: <T = unknown>(args: RequestArguments) => Promise<T>
  disconnect?: () => void
}

export class Account implements Signer {
  constructor(address: string, signer: Signer) {
    defineReadOnly(this, '_isSigner', true)
    defineReadOnly(this, '_address', address)
    defineReadOnly(this, '_signer', signer)
  }

  connect() {
    throw new Error('Changing providers is not supported.')
  }

  get shortAddress(): string | undefined {
    if (this._address) {
      return (
        this._address.substring(0, 4) +
        '...' +
        this._address.substring(this._address.length - 4)
      )
    }
  }

  async name(): string {
    const ens = await this.ensName()

    if (ens === null) {
      return this.shortAddress
    }

    return ens
  }

  async ensName(): string {
    if (this._ensname === undefined) {
      this._ensname = await this._signer.provider.lookupAddress(this._address)
    }

    return this._ensname
  }

  async ensAvatar(): string {
    if (this._ensavatar === undefined) {
      const name = await this.ensName()

      if (name === null) {
        return ''
      }

      this._ensavatar = await this._signer.provider.getAvatar(name)
    }

    return this._ensavatar
  }

  async getAddress(): Promise<string> {
    return this._address
  }

  async sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return this._signer.sendTransaction(transaction)
  }

  async signMessage(message: string): Promise<string> {
    return this._signer.signMessage(message)
  }

  async signTransaction(tx: TransactionRequest): Promise<string> {
    return this._signer.signTransactions(tx)
  }
}

export interface AccountContextType {
  account?: Account
  signer: Signer | null
  signIn: (wallet: keyof typeof Wallets) => Promise<void>
  signOut: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<ContractsContextType | Record<string, any>>(null!)
