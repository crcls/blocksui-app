export type ConnectWalletAction = {
  payload: boolean
  type: 'CONNECT_WALLET'
}

export type DropItemAction = {
  payload: string
  type: 'DROP_ITEM'
}

export type State = {
  connectWallet: {
    open: boolean
  }
  droppedItems: string[]
}
