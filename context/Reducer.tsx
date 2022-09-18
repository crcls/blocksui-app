import { ConnectWalletAction, DropItemAction, State } from './types'

const Reducer = (
  state: State,
  action: ConnectWalletAction | DropItemAction
): State => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return { ...state, connectWallet: { open: action.payload } }
    case 'DROP_ITEM':
      return { ...state, droppedItems: [...state.droppedItems, action.payload] }
    default:
      return state
  }
}

export default Reducer
