import * as ActionTypes from "../Types/ActionTypes";

export const Order = (
  state = { isLoading: true, errMess: null, order: [], orderid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        order: action.payload
      };

    case ActionTypes.FETCH_ORDERID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        orderid: action.payload
      };

    case ActionTypes.ORDER_LOADING:
      return { ...state, isLoading: true, errMess: null, order: [] };

    case ActionTypes.ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        order: []
      };

    default:
      return state;
  }
};
