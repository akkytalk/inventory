import * as ActionTypes from "../Types/ActionTypes";

export const Shipment = (
  state = { isLoading: true, errMess: null, shipment: [], shipmentid: [], shipmentorder: [], shipmentproduct: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SHIPMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipment: action.payload
      };

    case ActionTypes.FETCH_SHIPMENTORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipmentorder: action.payload
      };

    case ActionTypes.FETCH_SHIPMENTPRODUCT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipmentproduct: action.payload
      };

    case ActionTypes.FETCH_SHIPMENTID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipmentid: action.payload
      };

    case ActionTypes.SHIPMENT_LOADING:
      return { ...state, isLoading: true, errMess: null, shipment: [] };

    case ActionTypes.SHIPMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        shipment: []
      };

    default:
      return state;
  }
};
