import * as ActionTypes from "../Types/ActionTypes";

export const Supplier = (
  state = { isLoading: true, errMess: null, supplier: [], supplierid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SUPPLIER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        supplier: action.payload
      };

    case ActionTypes.FETCH_SUPPLIERID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        supplierid: action.payload
      };

    case ActionTypes.SUPPLIER_LOADING:
      return { ...state, isLoading: true, errMess: null, supplier: [] };

    case ActionTypes.SUPPLIER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        supplier: []
      };

    default:
      return state;
  }
};
