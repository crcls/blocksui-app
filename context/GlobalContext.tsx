import { createContext, FC, useReducer } from 'react'

import { Action, State } from './types'
import Reducer from './Reducer'

const initialState: State = {
  connectWallet: {
    open: false,
  },
}

export const GlobalContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

export const GlobalProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
