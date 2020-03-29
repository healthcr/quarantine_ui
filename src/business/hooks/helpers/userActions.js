export const userInitialState = {
  authorization: null,
  phone: "",
  pais: "505",
  ssn: "",
  loggedIn: false
};

export const userActions = {
  init: (state, payload) => {
    var userJSON = window.localStorage.getItem("user") || {};
    let newUser = { ...userInitialState };
    try {
      newUser = JSON.parse(userJSON);
    } catch (e) {
      console.log(e);
    }

    return { user: newUser };
  },
  login: (state, payload) => {
    const newUser = { ...state.user, ...payload, loggedIn: true };
    window.localStorage.setItem("user", JSON.stringify(newUser));

    return { user: newUser, app: { ...state.app, view: "DIAGNOSIS" } };
  },
  logout: state => {
    var anonUser = { loggedIn: false, authorization: null };

    window.localStorage.setItem("user", JSON.stringify(anonUser));
    return { user: anonUser };
  }
};
