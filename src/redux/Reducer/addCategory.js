import * as ActionTypes from "../Types/ActionTypes";

export const AddCategory = (
  state = { isLoading: true, errMess: null, category: [], edit: [], delete: [] },
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
        category: data,
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
        category: []
      };

    case ActionTypes.DELETE_CATEGORY:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        category: [],
        edit: []
      };

    case ActionTypes.CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        category: [],
        delete: []
      };

    case ActionTypes.CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        category: [],
        delete: []
      };

    default:
      return state;
  }
};
