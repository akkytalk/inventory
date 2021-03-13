import * as ActionTypes from "../Types/ActionTypes";

export const Delivery = (
  state = { isLoading: true, errMess: null, delivery: [], deliveryid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DELIVERY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delivery: action.payload
      };

    case ActionTypes.FETCH_DELIVERYID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deliveryid: action.payload
      };

    case ActionTypes.DELIVERY_LOADING:
      return { ...state, isLoading: true, errMess: null, delivery: [] };

    case ActionTypes.DELIVERY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        delivery: []
      };

    default:
      return state;
  }
};
