import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  MoveItemAction,
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

const moveChildItem = (element: any, payload: any) => {
  const childIndex = element.children.findIndex(
    (child: any) => child.id === payload.id
  )

  if (childIndex > -1) {
    if (
      (childIndex === 0 && payload.direction === 'up') ||
      (childIndex === element.children.length && payload.direction === 'down')
    ) {
      return element
    }

    const newChildren = element.children.slice()

    newChildren.splice(childIndex, 1)
    if (payload.direction === 'down') {
      newChildren.splice(childIndex + 1, 0, element.children[childIndex])
    } else {
      newChildren.splice(childIndex - 1, 0, element.children[childIndex])
    }

    return {
      ...element,
      children: newChildren,
    }
  }

  return {
    ...element,
    children: [
      ...element.children.map((childElement: any) =>
        moveChildItem(childElement, payload)
      ),
    ],
  }
}

const Reducer = (
  state: State,
  action:
    | ConnectWalletAction
    | DropItemAction
    | DropItemInItemAction
    | MoveItemAction
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
    case 'MOVE_ITEM': {
      const index = state.droppedItems.findIndex(
        (element: any) => element.id === action.payload.id
      )

      if (index !== -1) {
        if (
          (index === 0 && action.payload.direction === 'up') ||
          (index === state.droppedItems.length &&
            action.payload.direction === 'down')
        ) {
          return state
        }

        const newDroppedItems = state.droppedItems.slice()

        newDroppedItems.splice(index, 1)
        if (action.payload.direction === 'down') {
          newDroppedItems.splice(index + 1, 0, state.droppedItems[index])
        } else {
          newDroppedItems.splice(index - 1, 0, state.droppedItems[index])
        }

        return {
          ...state,
          droppedItems: newDroppedItems,
        }
      } else {
        return {
          ...state,
          droppedItems: [
            ...state.droppedItems.map((element) =>
              moveChildItem(element, action.payload)
            ),
          ],
        }
      }
    }
    default:
      return state
  }
}

export default Reducer
