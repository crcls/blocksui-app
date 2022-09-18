export type Action = {
  payload: boolean
  type: 'CONNECT_WALLET'
}

export type State = {
  connectWallet: {
    open: boolean
  }
}
