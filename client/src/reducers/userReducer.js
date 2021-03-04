import { actions } from "../actions/user";

const userState = {
  currentUser : {},
  isAuth: false,
}

export default function userReducer(state = userState, action) {
  switch (action.type){
    case actions.APPEND_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      }
    case actions.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      }
    default:
      return state
  }
}
