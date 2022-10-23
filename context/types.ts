import { ReactNode } from 'react'

export type ConnectWalletAction = {
  payload: boolean
  type: 'CONNECT_WALLET'
}

export type DropItemAction = {
  payload: any
  type: 'DROP_ITEM'
}

export type DropItemInItemAction = {
  payload: any
  type: 'DROP_ITEM_IN_ITEM'
}

export type GlobalProviderProps = {
  children: ReactNode
}

export type MoveItemAction = {
  payload: {
    direction: string
    id: string
  }
  type: 'MOVE_ITEM'
}

type DroppedItem = {
  [key: string]: any
}

export type State = {
  connectWallet: {
    open: boolean
  }
  droppedItems: DroppedItem[]
}
