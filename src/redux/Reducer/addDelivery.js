import * as ActionTypes from "../Types/ActionTypes";

export const AddDelivery = (
  state = { isLoading: true, errMess: null, delivery: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_CATEGORY:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delivery: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_CATEGORY:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        delivery: []
      };

    case ActionTypes.DELETE_CATEGORY:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        delivery: [],
        edit: []
      };

    case ActionTypes.CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        delivery: [],
        delete: []
      };

    case ActionTypes.CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        delivery: [],
        delete: []
      };

    default:
      return state;
  }
};
