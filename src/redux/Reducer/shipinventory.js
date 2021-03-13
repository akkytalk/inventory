import * as ActionTypes from "../Types/ActionTypes";

export const Shipinventory = (
  state = {
    isLoading: true,
    errMess: null,
    shipinventory: [],
    shipinventoryid: [],
    shipinventoryorder: [],
    shipinventoryproduct: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SHIPINVENTORY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipinventory: action.payload
      };

    case ActionTypes.FETCH_SHIPINVENTORYORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipinventoryorder: action.payload
      };

    case ActionTypes.FETCH_SHIPINVENTORYPRODUCT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipinventoryproduct: action.payload
      };

    case ActionTypes.FETCH_SHIPINVENTORYID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipinventoryid: action.payload
      };

    case ActionTypes.SHIPINVENTORY_LOADING:
      return { ...state, isLoading: true, errMess: null, shipinventory: [] };

    case ActionTypes.SHIPINVENTORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        shipinventory: []
      };

    default:
      return state;
  }
};
