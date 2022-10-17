import { createContext, FC, useReducer } from 'react'

import {
  ConnectWalletAction,
  DropItemAction,
  DropItemInItemAction,
  GlobalProviderProps,
  MoveItemAction,
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
    ConnectWalletAction | DropItemAction | DropItemInItemAction | MoveItemAction
  >
  apiHost: string
  web3Token: string
}>({
  state: initialState,
  dispatch: () => null,
  apiHost: '',
  web3Token: '',
})

export const GlobalProvider: FC<GlobalProviderProps> = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        apiHost: 'https://blocksui.io',
        // apiHost: 'http://127.0.0.1:8081',
        web3Token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc5NDI1OGJmOTNDNTUyMmU0ZTFkNzEyMkRBNjdFZERlRENCNUZkNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMyMDc4Mjg4MTUsIm5hbWUiOiJCbG9ja3NVSSJ9.u0b4cN7AUkr56iD_juch7OyFjgQRkaiictzmyxAIix0',
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
