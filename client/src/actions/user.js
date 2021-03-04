export const actions = {
  SIGN_IN: 'SIGN_IN',
  LOG_IN: 'LOG_IN',
  APPEND_USER: 'APPEND_USER',
  LOGOUT: 'LOGOUT',
  AUTH: 'AUTH',
};

export const signInActionCreator = user => ({ type: actions.SIGN_IN, payload: user });
export const logInActionCreator = user => ({ type: actions.LOG_IN, payload: user });
export const appendUserActionCreator = user => ({ type: actions.APPEND_USER, payload: user });
export const logoutActionCreator = () => ({ type: actions.LOGOUT });
export const authActionCreator = () => ({ type: actions.AUTH });
