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
  _ethProvider: BaseProvider

  private _ensname: string | null = null
  private _ensavatar: string | null = null

  constructor(address: string, signer: Signer, ethProvider: BaseProvider) {
    super()
    this._address = address
    this._signer = signer
    this._ethProvider = ethProvider
    defineReadOnly(this, '_address', address)
    defineReadOnly(this, '_signer', signer)
    defineReadOnly(this, '_ethProvider', ethProvider)
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

  get address(): string {
    return this._address
  }

  get signer(): Signer {
    return this._signer
  }

  async name(): Promise<string> {
    const ens = await this.ensName()

    if (ens === null || ens === '') {
      return this.shortAddress
    }

    return ens
  }

  async ensName(): Promise<string> {
    if (this._ensname === null) {
      this._ensname = await this._ethProvider.lookupAddress(this._address)
    }

    return this._ensname || ''
  }

  async ensAvatar(): Promise<string> {
    if (this._ensavatar === null) {
      const name = await this.ensName()

      if (name === null) {
        return ''
      }

      this._ensavatar = await this._ethProvider.getAvatar(name)
    }

    return this._ensavatar || ''
  }

  async getAddress(): Promise<string> {
    return this._address
  }

  async getChainId(): Promise<number> {
    return await this._signer.getChainId()
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
  isLoading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<AccountContextType | Record<string, any>>(null!)
