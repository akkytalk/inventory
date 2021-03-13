import * as ActionTypes from "../Types/ActionTypes";

export const AddProduct = (
  state = { isLoading: true, errMess: null, product: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_PRODUCT:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        product: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_PRODUCT:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        product: []
      };

    case ActionTypes.DELETE_PRODUCT:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        product: [],
        edit: []
      };

    case ActionTypes.PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        product: [],
        delete: []
      };

    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        product: [],
        delete: []
      };

    default:
      return state;
  }
};
