import { createContext, FC, useReducer } from 'react'

import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  GlobalProviderProps,
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
  apiHost: string
}>({
  state: initialState,
  dispatch: () => null,
  apiHost: '',
})

export const GlobalProvider: FC<GlobalProviderProps> = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        // apiHost: 'https://blocksui.io',
        apiHost: 'http://127.0.0.1:8081',
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
