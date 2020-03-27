export const appActions = {
  setView: (state, payload) => {
    return { ...state, app: { ...state.app, view: payload } };
  }
};
