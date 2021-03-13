import * as ActionTypes from "../Types/ActionTypes";

export const Stock = (
  state = { isLoading: true, errMess: null, stock: [], stockid: [], count:[] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_STOCK:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        stock: action.payload
      };

    case ActionTypes.FETCH_COUNT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        count: action.payload
      };

    case ActionTypes.FETCH_STOCKID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        stockid: action.payload
      };

    case ActionTypes.STOCK_LOADING:
      return { ...state, isLoading: true, errMess: null, stock: [] };

    case ActionTypes.STOCK_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        stock: []
      };

    default:
      return state;
  }
};
