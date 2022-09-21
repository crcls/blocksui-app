import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  State,
} from './types'

const addBlockToChild = (element: any, payload: any) => {
  if (element.id === payload.id) {
    return {
      ...element,
      children: [...element.children, payload.block],
    }
  }

  return {
    ...element,
    children: [
      ...element.children.map((childElement: any) =>
        addBlockToChild(childElement, payload)
      ),
    ],
  }
}

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
      return {
        ...state,
        droppedItems: [
          ...state.droppedItems.map((element) =>
            addBlockToChild(element, action.payload)
          ),
        ],
      }
    }
    default:
      return state
  }
}

export default Reducer
