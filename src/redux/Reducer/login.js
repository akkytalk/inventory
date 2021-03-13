import * as ActionTypes from "../Types/ActionTypes";

export const Login = (
  state = { isLoading: true, errMess: null, login: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: action.payload
      };

    case ActionTypes.LOGIN_LOADING:
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        login: []
      };

    case ActionTypes.REMOVE_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: action.payload
      };

    default:
      return state;
  }
};
