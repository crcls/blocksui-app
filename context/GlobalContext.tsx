import { createContext, FC, ReactNode, useReducer } from 'react'

import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  State,
} from './types'
import Reducer from './Reducer'

const initialState: State = {
  connectWallet: {
    open: false,
  },
  droppedItems: [],
}

export const GlobalContext = createContext<{
  state: State
  dispatch: React.Dispatch<
    ConnectWalletAction | DropItemAction | DropItemInItemAction
  >
}>({
  state: initialState,
  dispatch: () => null,
})

interface Props {
  children: ReactNode
}

export const GlobalProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
