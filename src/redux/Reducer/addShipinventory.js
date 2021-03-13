import * as ActionTypes from "../Types/ActionTypes";

export const AddShipinventory = (
  state = {
    isLoading: true,
    errMess: null,
    shipinventory: [],
    edit: [],
    delete: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_SHIPINVENTORY:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        shipinventory: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_SHIPINVENTORY:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        shipinventory: []
      };

    case ActionTypes.DELETE_SHIPINVENTORY:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        shipinventory: [],
        edit: []
      };

    case ActionTypes.SHIPINVENTORY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        shipinventory: [],
        delete: []
      };

    case ActionTypes.SHIPINVENTORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        shipinventory: [],
        delete: []
      };

    default:
      return state;
  }
};
