import * as ActionTypes from "../Types/ActionTypes";

export const AddWarehouse = (
  state = { isLoading: true, errMess: null, warehouse: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_WAREHOUSE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        warehouse: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_WAREHOUSE:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        warehouse: []
      };

    case ActionTypes.DELETE_WAREHOUSE:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        warehouse: [],
        edit: []
      };

    case ActionTypes.WAREHOUSE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        warehouse: [],
        delete: []
      };

    case ActionTypes.WAREHOUSE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        warehouse: [],
        delete: []
      };

    default:
      return state;
  }
};
