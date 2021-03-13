import * as ActionTypes from "../Types/ActionTypes";

export const Warehouse = (
  state = { isLoading: true, errMess: null, warehouse: [], warehouseid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_WAREHOUSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        warehouse: action.payload
      };

    case ActionTypes.FETCH_WAREHOUSEID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        warehouseid: action.payload
      };

    case ActionTypes.WAREHOUSE_LOADING:
      return { ...state, isLoading: true, errMess: null, warehouse: [] };

    case ActionTypes.WAREHOUSE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        warehouse: []
      };

    default:
      return state;
  }
};
