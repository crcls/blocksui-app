import { createContext } from 'react'
import {
  WebSocketProvider,
  Web3Provider as W3Provider,
} from '@ethersproject/providers'

export interface AlchemyEnhancedApiProvider {
  send: (method: string, params?: { [param: string]: any }) => Promise<Object>
}

interface GasRates {
  date: number
  ethUsd: number
  fast: number
  limit: number
}

export enum Networks {
  mainnet = 1,
  goerli = 5,
  polygon = 137,
  mumbai = 80001,
}

export const NETWORKS: { [key: string]: string } = {
  development: 'mumbai',
  staging: 'mumbai',
  production: 'polygon',
}

export interface Web3ContextType {
  alchemyEnhancedApiProvider: AlchemyEnhancedApiProvider
  alchemyWsProvider: WebSocketProvider
  infuraWsProvider?: WebSocketProvider
  walletConnectProvider?: W3Provider
  metamaskProvider?: W3Provider
  coinbaseProvider?: W3Provider
  gasRates: GasRates | null
  gasFailed: boolean
  network?: Networks
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Web3Context = createContext<Web3ContextType>(null!)
