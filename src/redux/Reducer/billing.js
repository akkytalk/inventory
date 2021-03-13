import * as ActionTypes from "../Types/ActionTypes";

export const Billing = (
  state = { isLoading: true, errMess: null, billing: [], billingid: [], billingorder: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BILLING:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billing: action.payload
      };

    case ActionTypes.FETCH_BILLINGORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billingorder: action.payload
      };

    case ActionTypes.FETCH_BILLINGID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billingid: action.payload
      };

    case ActionTypes.BILLING_LOADING:
      return { ...state, isLoading: true, errMess: null, billing: [] };

    case ActionTypes.BILLING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        billing: []
      };

    default:
      return state;
  }
};
