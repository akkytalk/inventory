import * as ActionTypes from "../Types/ActionTypes";

export const AddOrder = (
  state = { isLoading: true, errMess: null, order: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_ORDER:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        order: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_ORDER:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        order: []
      };

    case ActionTypes.DELETE_ORDER:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        order: [],
        edit: []
      };

    case ActionTypes.ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        order: [],
        delete: []
      };

    case ActionTypes.ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        order: [],
        delete: []
      };

    default:
      return state;
  }
};
