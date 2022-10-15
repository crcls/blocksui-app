import { createContext } from 'react'
import { IEthereumProvider, RequestArguments } from 'eip1193-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'
import { Deferrable, defineReadOnly } from '@ethersproject/properties'
import {
  BaseProvider,
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

export class Account extends Signer {
  _address: string
  _signer: Signer

  private _ensname: string | null = null
  private _ensavatar: string | null = null

  constructor(address: string, signer: Signer) {
    super()
    this._address = address
    this._signer = signer
    defineReadOnly(this, '_address', address)
    defineReadOnly(this, '_signer', signer)
  }

  connect(provider: Provider): Signer {
    throw new Error('Changing providers is not supported.')
  }

  get shortAddress(): string {
    return (
      this._address.substring(0, 4) +
      '...' +
      this._address.substring(this._address.length - 4)
    )
  }

  async name(): Promise<string> {
    const ens = await this.ensName()

    if (ens === null) {
      return this.shortAddress
    }

    return ens
  }

  async ensName(): Promise<string> {
    if (this._ensname === null && this._signer?.provider) {
      this._ensname = await this._signer.provider.lookupAddress(this._address)
    }

    return this._ensname || ''
  }

  async ensAvatar(): Promise<string> {
    if (this._ensavatar === null && this._signer?.provider) {
      const name = await this.ensName()

      if (name === null) {
        return ''
      }

      this._ensavatar = await (this._signer.provider as BaseProvider).getAvatar(
        name
      )
    }

    return this._ensavatar || ''
  }

  async getAddress(): Promise<string> {
    return this._address
  }

  async sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    return await this._signer.sendTransaction(transaction)
  }

  async signMessage(message: string): Promise<string> {
    return await this._signer.signMessage(message)
  }

  async signTransaction(tx: TransactionRequest): Promise<string> {
    return await this._signer.signTransaction(tx)
  }
}

export interface AccountContextType {
  account?: Account
  signer: Signer | null
  signIn: (wallet: keyof typeof Wallets) => Promise<void>
  signOut: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<AccountContextType | Record<string, any>>(null!)
