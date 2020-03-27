import React, { createContext, useReducer, useContext } from "react";
import { userInitialState, userActions } from "./helpers/userActions";
import { appActions } from "./helpers/appActions";

// combine initial states
const initialState = {
  port: 4000,
  api: "crm",
  app: { view: "PAYWALL" },
  ...userInitialState,
  paciente: {}
};

const StoreContext = createContext(initialState);

// combine actions
const Actions = {
  ...userActions,
  ...appActions,
  updatePaciente: (state, payload) => {
    state.paciente = { ...(state.paciente || {}), ...payload };
  }
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const update = act(state, action.payload);

  return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);

  return { state, dispatch };
};
