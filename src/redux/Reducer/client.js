import * as ActionTypes from "../Types/ActionTypes";

export const Client = (
  state = { isLoading: true, errMess: null, client: [], clientid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_CLIENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        client: action.payload
      };

    case ActionTypes.FETCH_CLIENTID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        clientid: action.payload
      };

    case ActionTypes.CLIENT_LOADING:
      return { ...state, isLoading: true, errMess: null, client: [] };

    case ActionTypes.CLIENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        client: []
      };

    default:
      return state;
  }
};
