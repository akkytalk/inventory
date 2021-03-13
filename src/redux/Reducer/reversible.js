import * as ActionTypes from "../Types/ActionTypes";

export const Reversible = (
  state = { isLoading: true, errMess: null, reversible: [], reversibleid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_REVERSIBLE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reversible: action.payload
      };

    case ActionTypes.FETCH_REVERSIBLEID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reversibleid: action.payload
      };

    case ActionTypes.REVERSIBLE_LOADING:
      return { ...state, isLoading: true, errMess: null, reversible: [] };

    case ActionTypes.REVERSIBLE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reversible: []
      };

    default:
      return state;
  }
};
