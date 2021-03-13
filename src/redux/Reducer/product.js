import * as ActionTypes from "../Types/ActionTypes";

export const Product = (
  state = { isLoading: true, errMess: null, product: [], productid: [], productorder: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        product: action.payload
      };

    case ActionTypes.FETCH_PRODUCTORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        productorder: action.payload
      };

    case ActionTypes.FETCH_PRODUCTID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        productid: action.payload
      };

    case ActionTypes.PRODUCT_LOADING:
      return { ...state, isLoading: true, errMess: null, product: [] };

    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        product: []
      };

    default:
      return state;
  }
};
