import * as ActionTypes from "../Types/ActionTypes";

export const AddSupplier = (
  state = { isLoading: true, errMess: null, supplier: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_SUPPLIER:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        supplier: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_SUPPLIER:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        supplier: []
      };

    case ActionTypes.DELETE_SUPPLIER:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        supplier: [],
        edit: []
      };

    case ActionTypes.SUPPLIER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        supplier: [],
        delete: []
      };

    case ActionTypes.SUPPLIER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        supplier: [],
        delete: []
      };

    default:
      return state;
  }
};
