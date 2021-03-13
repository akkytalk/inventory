import * as ActionTypes from "../Types/ActionTypes";

export const AddStock = (
  state = { isLoading: true, errMess: null, stock: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_STOCK:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        stock: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_STOCK:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        stock: []
      };

    case ActionTypes.DELETE_STOCK:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        stock: [],
        edit: []
      };

    case ActionTypes.STOCK_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        stock: [],
        delete: []
      };

    case ActionTypes.STOCK_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        stock: [],
        delete: []
      };

    default:
      return state;
  }
};
