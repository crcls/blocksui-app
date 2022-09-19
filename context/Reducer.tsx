import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  State,
} from './types'

const Reducer = (
  state: State,
  action: ConnectWalletAction | DropItemAction | DropItemInItemAction
): State => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return { ...state, connectWallet: { open: action.payload } }
    case 'DROP_ITEM':
      return { ...state, droppedItems: [...state.droppedItems, action.payload] }
    case 'DROP_ITEM_IN_ITEM': {
      const newDroppedItems = state.droppedItems
      newDroppedItems[action.payload.id].children = action.payload

      return { ...state, droppedItems: [newDroppedItems] }
    }
    default:
      return state
  }
}

export default Reducer
