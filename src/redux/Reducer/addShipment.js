import * as ActionTypes from "../Types/ActionTypes";

export const AddShipment = (
  state = { isLoading: true, errMess: null, shipment: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_SHIPMENT:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipment: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_SHIPMENT:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        shipment: []
      };

    case ActionTypes.DELETE_SHIPMENT:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        shipment: [],
        edit: []
      };

    case ActionTypes.SHIPMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        shipment: [],
        delete: []
      };

    case ActionTypes.SHIPMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        shipment: [],
        delete: []
      };

    default:
      return state;
  }
};
