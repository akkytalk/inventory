import * as ActionTypes from "../Types/ActionTypes";

export const User = (
  state = { isLoading: true, errMess: null, user: [], userid: [], deliveryuser: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload
      };

    case ActionTypes.FETCH_DELIVERYUSER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deliveryuser: action.payload
      };

    case ActionTypes.FETCH_USERID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        userid: action.payload
      };

    case ActionTypes.USER_LOADING:
      return { ...state, isLoading: true, errMess: null, user: [] };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: []
      };

    default:
      return state;
  }
};
